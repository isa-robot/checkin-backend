import { inject, injectable } from "tsyringe";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import { eachDayOfInterval, parseISO, addDays, formatISO } from "date-fns";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import IStatisticTypesRepository from "@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class ListUsersApprovedNotApprovedByDateTotalService {
  constructor(
    @inject("StatisticsRepository")
    private statisticsRepository: IStatisticsRepository,
    @inject("StatisticTypesRepository")
    private statisticTypesRepository: IStatisticTypesRepository
  ) { }

  public async execute(
    establishment: Establishment,
    startDate: string,
    endDate: string
  ): Promise<any[]> {
    const days = eachDayOfInterval({
      start: parseISO(startDate),
      end: parseISO(endDate),
    });
    const data = [];
    let approved = 0;
    let notApproved = 0;
    const typeApproved = await this.statisticTypesRepository.findByName(
      "Total Aprovados"
    );
    if (!typeApproved) {
      throw new AppError(
        "Tipo de Estatística Total Aprovados não encontrada",
        404
      );
    }
    const typeNotApproved = await this.statisticTypesRepository.findByName(
      "Total Não Aprovados"
    );
    if (!typeNotApproved) {
      throw new AppError(
        "Tipo de Estatística Total Não Aprovados não encontrada",
        404
      );
    }

    for (const day of days) {
      const statisticApproved = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        typeApproved.id,
        addDays(day, 1)
      );
      if (statisticApproved) {
        approved = statisticApproved.value;
      } else {
        approved = 0;
      }

      const statisticNotApproved = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        typeNotApproved.id,
        addDays(day, 1)
      );
      if (statisticNotApproved) {
        notApproved = statisticNotApproved.value;
      } else {
        notApproved = 0;
      }

      data.push({
        date: formatISO(day, { representation: "date" }),
        approved: approved,
        notApproved: notApproved,
      });
    }

    return data;
  }
}

export default ListUsersApprovedNotApprovedByDateTotalService;
