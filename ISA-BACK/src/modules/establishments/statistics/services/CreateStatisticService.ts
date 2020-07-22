import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import Statistic from "@establishments/statistics/infra/typeorm/entities/Statistic";
import IStatisticTypesRepository from "../statistic-types/repositories/IStatisticTypesRepository";

interface Request {
  value: number;
  statisticTypeId: string;
  establishmentId: string;
}

@injectable()
class CreateStatisticService {
  constructor(
    @inject("StatisticsRepository")
    private statisticsRepository: IStatisticsRepository,
    @inject("StatisticTypesRepository")
    private statisticTypesRepository: IStatisticTypesRepository,
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) { }

  public async execute({
    value,
    statisticTypeId,
    establishmentId,
  }: Request): Promise<Statistic> {
    const establishment = await this.establishmentsRepository.findById(
      establishmentId
    );

    if (!establishment) {
      throw new AppError("Estabelecimento não encontrado", 404);
    }

    const statisticType = await this.statisticTypesRepository.findById(
      statisticTypeId
    );

    if (!statisticType) {
      throw new AppError("Tipo de Estatística não encontrado", 404);
    }

    const statistic = await this.statisticsRepository.create({
      value,
      establishment,
      statisticType,
    });

    return statistic;
  }
}

export default CreateStatisticService;
