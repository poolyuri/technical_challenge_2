import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DatabaseSwapiRepository } from './swapi.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  providers: [DatabaseSwapiRepository, DatabaseUserRepository],
  exports: [DatabaseSwapiRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
