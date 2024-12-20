import { Controller, Get, Inject, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from '../../../common/swagger/response.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwtAuth.guard';
import { UseCaseProxy } from '../../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../usecases-proxy/usecases-proxy.module';
import { GetPlanetsUseCases } from '../../../../usecases/swapi/getPlanets.usecases';
import { PlanetPresenter } from './planet.presenter';

@Controller('swapi')
@ApiTags('swapi')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PlanetPresenter)
export class PlanetController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PLANETS_USECASES_PROXY)
    private readonly getPlanetsUsecaseProxy: UseCaseProxy<GetPlanetsUseCases>,
  ) {}

  @Get('planets')
  //@UseGuards(JwtAuthGuard)
  @ApiResponseType(PlanetPresenter, true)
  async getPlanets(@Query('page') page: string) {
    const planets = await this.getPlanetsUsecaseProxy.getInstance().execute(page);
    return planets;
  }
}
