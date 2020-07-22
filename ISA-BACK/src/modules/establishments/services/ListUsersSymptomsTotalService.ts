import { inject, injectable } from "tsyringe";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import IStatisticTypesRepository from "@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository";
import AppError from "@shared/errors/AppError";
import { formatISO } from "date-fns";

@injectable()
class ListUsersSymptomsTotalService {
  constructor(
    @inject("StatisticsRepository")
    private statisticsRepository: IStatisticsRepository,
    @inject("StatisticTypesRepository")
    private statisticTypesRepository: IStatisticTypesRepository
  ) { }

  public async execute(establishment: Establishment): Promise<any[]> {
    const date = new Date(formatISO(new Date(), { representation: "date" }));
    const data = [];
    const symptoms = [
      { column: "smellLoss", shortName: "Perda do olfato", name: "Total Perda do olfato", type: {} },
      { column: "tasteLoss", shortName: "Perda do paladar", name: "Total Perda do paladar", type: {} },
      { column: "appetiteLoss", shortName: "Perda de apetite", name: "Total Perda de apetite", type: {} },
      { column: "fatigue", shortName: "Cansaço", name: "Total Cansaço", type: {} },
      { column: "fever", shortName: "Febre", name: "Total Febre", type: {} },
      { column: "cough", shortName: "Tosse persistente", name: "Total Tosse persistente", type: {} },
      { column: "diarrhea", shortName: "Diarréia", name: "Total Diarréia", type: {} },
      { column: "delirium", shortName: "Delírios", name: "Total Delírios", type: {} },
      { column: "soreThroat", shortName: "Rouquidão", name: "Total Rouquidão", type: {} },
      { column: "shortnessOfBreath", shortName: "Falta de ar", name: "Total Falta de ar", type: {} },
      { column: "abdominalPain", shortName: "Dor abdominal", name: "Total Dor abdominal", type: {} },
      { column: "chestPain", shortName: "Dor torácica", name: "Total Dor torácica", type: {} },
    ];

    for (const symptom of symptoms) {
      let type = await this.statisticTypesRepository.findByName(symptom.name);

      if (!type) {
        throw new AppError(
          `Tipo de Estatística ${symptom.name} não encontrada!`,
          404
        );
      }
      symptom.type = type;
    }

    for (const symptom of symptoms) {
      const statistic = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        //@ts-ignore
        symptom.type.id,
        date
      );
      if (statistic && statistic.value > 0) {
        data.push({ symptom: symptom.shortName, value: statistic.value });
      }
    }

    return data;
  }
}

export default ListUsersSymptomsTotalService;
