import { inject, injectable } from "tsyringe";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import IStatisticTypesRepository from "@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository";
import AppError from "@shared/errors/AppError";
import { formatISO } from "date-fns";

@injectable()
class ListUsersSymptomsService {
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
      { column: "smellLoss", name: "Perda de olfato", type: {} },
      { column: "tasteLoss", name: "Perda de paladar", type: {} },
      { column: "appetiteLoss", name: "Perda de apetite", type: {} },
      { column: "fatigue", name: "Cansaço", type: {} },
      { column: "fever", name: "Febre", type: {} },
      { column: "cough", name: "Tosse persistente", type: {} },
      { column: "diarrhea", name: "Diarréia", type: {} },
      { column: "delirium", name: "Delírios", type: {} },
      { column: "soreThroat", name: "Rouquidão", type: {} },
      { column: "shortnessOfBreath", name: "Falta de ar", type: {} },
      { column: "abdominalPain", name: "Dor abdominal", type: {} },
      { column: "chestPain", name: "Dor torácica", type: {} },
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
        data.push({ symptom: symptom.name, value: statistic.value });
      }
    }

    return data;
  }
}

export default ListUsersSymptomsService;
