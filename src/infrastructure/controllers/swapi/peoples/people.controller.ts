import { Controller, Get, Inject, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { ApiResponseType } from '../../../common/swagger/response.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwtAuth.guard';
import { UseCaseProxy } from '../../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../usecases-proxy/usecases-proxy.module';
import { GetPeoplesUseCases } from '../../../../usecases/swapi/getPeoples.usecases';
import { PeoplePresenter } from './people.presenter';

@Controller('swapi')
@ApiTags('swapi')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PeoplePresenter)
@UseInterceptors(CacheInterceptor)
export class PeopleController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PERSONS_USECASES_PROXY)
    private readonly getPeoplesUsecaseProxy: UseCaseProxy<GetPeoplesUseCases>
  ) {}

  @Get('peoples')
  @CacheKey('peoples')
  //@UseGuards(JwtAuthGuard)
  @ApiResponseType(PeoplePresenter, true)
  @ApiResponseType(null, true)
  async getPeoples(@Query('page') page: string) {
    const peoples = await this.getPeoplesUsecaseProxy.getInstance().execute(page);
    return peoples;
  }
}
