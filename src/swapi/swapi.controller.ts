import { Controller, Get, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { SwapiService } from './swapi.service';

@Controller('swapis')
export class SwapiController {
  constructor(
    private swapiService: SwapiService
  ) { }

  @Get('peoples/:page')
  async getAllPeoples(@Param('page') page: string) {
    return await this.swapiService.getPeoples(page);
  };

  @Get('planets/:page')
  async getAllPlanets(@Param('page') page: string) {
    return await this.swapiService.getPlanets(page);
  };

  @Get('fusions/:page')
  async getAllFusions(@Param('page') page: string) {
    return await this.swapiService.getFusions(page);
  };

}
