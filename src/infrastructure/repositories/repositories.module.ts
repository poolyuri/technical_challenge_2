import { Module } from '@nestjs/common';
import { DatabaseSwapiRepository } from './swapi.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  providers: [DatabaseSwapiRepository, DatabaseUserRepository],
  exports: [DatabaseSwapiRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
