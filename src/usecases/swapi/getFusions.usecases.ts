import { Fusion } from "../../domain/model/fusion";
import { SwapiRepository } from "../../domain/repositories/swapi-repository.interface";

export class GetFusionsUseCases {
  constructor(
    private readonly swapiRepository: SwapiRepository) { }

    execute = async (page: string): Promise<Fusion[]> => {
      return await this.swapiRepository.getAllFusions(page);
    }
}