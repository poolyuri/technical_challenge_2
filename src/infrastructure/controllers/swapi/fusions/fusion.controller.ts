import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from '../../../common/swagger/response.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwtAuth.guard';
import { UseCaseProxy } from '../../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../usecases-proxy/usecases-proxy.module';
import { GetFusionsUseCases } from '../../../../usecases/swapi/getFusions.usecases';
import { FusionPresenter } from './fusion.presenter';

@Controller('swapi')
@ApiTags('swapi')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(FusionPresenter)
export class FusionController {
  constructor(
    @Inject(UsecasesProxyModule.GET_FUSIONS_USECASES_PROXY)
    private readonly getFusionsUsecaseProxy: UseCaseProxy<GetFusionsUseCases>,
  ) {}

  @Get('fusions')
  //@UseGuards(JwtAuthGuard)
  @ApiResponseType(FusionPresenter, true)
  async getFusions(@Query('page') page: string) {
    const fusions = await this.getFusionsUsecaseProxy.getInstance().execute(page);
    return fusions;
  }
}
