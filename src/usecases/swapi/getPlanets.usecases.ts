import { Planet } from "../../domain/model/planet";
import { SwapiRepository } from "../../domain/repositories/swapi-repository.interface";

export class GetPlanetsUseCases {
  constructor(
    private readonly swapiRepository: SwapiRepository) { }

    execute = async (page: string): Promise<Planet[]> => {
      return await this.swapiRepository.getAllPlanets(page);
    }
}