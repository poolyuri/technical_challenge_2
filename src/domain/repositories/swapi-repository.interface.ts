import { People } from '../model/people';
import { Planet } from '../model/planet';
import { Fusion } from '../model/fusion';

export interface SwapiRepository {
  getAllPeoples(page: string): Promise<People[]>;
  getAllPlanets(page: string): Promise<Planet[]>;
  getAllFusions(page: string): Promise<Fusion[]>;
}
