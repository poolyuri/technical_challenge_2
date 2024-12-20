import { People } from "../../domain/model/people";
import { SwapiRepository } from "../../domain/repositories/swapi-repository.interface";

export class GetPeoplesUseCases {
  constructor(
    private readonly swapiRepository: SwapiRepository) { }

    execute = async (page: string): Promise<People[]> => {
      return await this.swapiRepository.getAllPeoples(page);
    }
}