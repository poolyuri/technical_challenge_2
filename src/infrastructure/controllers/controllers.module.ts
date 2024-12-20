import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { PeopleController } from './swapi/peoples/people.controller';
import { PlanetController } from './swapi/planets/planet.controller';
import { FusionController } from './swapi/fusions/fusion.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    PeopleController, 
    PlanetController,
    FusionController,
    AuthController
  ],
})
export class ControllersModule {}
