import { DynamicModule, Module } from '@nestjs/common';
import { GetPeoplesUseCases } from "../../usecases/swapi/getPeoples.usecases";
import { GetPlanetsUseCases } from '../../usecases/swapi/getPlanets.usecases';
import { GetFusionsUseCases } from '../../usecases/swapi/getFusions.usecases';

import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseSwapiRepository } from '../repositories/swapi.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  // Swapi
  static GET_PERSONS_USECASES_PROXY = 'getPersonsUsecasesProxy';
  static GET_PLANETS_USECASES_PROXY = 'getPlanetsUsecasesProxy';
  static GET_FUSIONS_USECASES_PROXY = 'getFusionsUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseSwapiRepository],
          provide: UsecasesProxyModule.GET_PERSONS_USECASES_PROXY,
          useFactory: (swapiRepository: DatabaseSwapiRepository) => new UseCaseProxy(new GetPeoplesUseCases(swapiRepository)),
        },
        {
          inject: [DatabaseSwapiRepository],
          provide: UsecasesProxyModule.GET_PLANETS_USECASES_PROXY,
          useFactory: (swapiRepository: DatabaseSwapiRepository) => new UseCaseProxy(new GetPlanetsUseCases(swapiRepository)),
        },
        {
          inject: [DatabaseSwapiRepository],
          provide: UsecasesProxyModule.GET_FUSIONS_USECASES_PROXY,
          useFactory: (swapiRepository: DatabaseSwapiRepository) => new UseCaseProxy(new GetFusionsUseCases(swapiRepository)),
        }
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.GET_PERSONS_USECASES_PROXY,
        UsecasesProxyModule.GET_PLANETS_USECASES_PROXY,
        UsecasesProxyModule.GET_FUSIONS_USECASES_PROXY
      ],
    };
  }
}
