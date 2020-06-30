import { inject, injectable } from "tsyringe";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import Statistic from "@establishments/statistics/infra/typeorm/entities/Statistic";
import AppError from "@shared/errors/AppError";
@injectable()
class ShowStatisticService {
  constructor(
    @inject("StatisticsRepository")
    private statisticsRepository: IStatisticsRepository
  ) { }

  public async execute(id: string): Promise<Statistic> {
    const statistic = await this.statisticsRepository.findById(id);

    if (!statistic) {
      throw new AppError("Estatística não encontrada!");
    }

    return statistic;
  }
}

export default ShowStatisticService;
