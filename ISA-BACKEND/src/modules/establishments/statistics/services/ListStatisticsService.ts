import { inject, injectable } from "tsyringe";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import Statistic from "@establishments/statistics/infra/typeorm/entities/Statistic";

@injectable()
class ListStatisticsService {
  constructor(
    @inject("StatisticsRepository")
    private statisticsRepository: IStatisticsRepository
  ) { }

  public async execute(): Promise<Statistic[]> {
    const statistics = await this.statisticsRepository.findAll();

    return statistics;
  }
}

export default ListStatisticsService;
