import { inject, injectable } from "tsyringe";
import IStatisticTypesRepository from "../repositories/IStatisticTypesRepository";
import StatisticType from "../infra/typeorm/entities/StatisticType";

@injectable()
class ListStatisticTypesService {
  constructor(
    @inject("StatisticTypesRepository")
    private statisticTypesRepository: IStatisticTypesRepository
  ) { }

  public async execute(): Promise<StatisticType[]> {
    const statisticTypes = await this.statisticTypesRepository.findAll();

    return statisticTypes;
  }
}

export default ListStatisticTypesService;
