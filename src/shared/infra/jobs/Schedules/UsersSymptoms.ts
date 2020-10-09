import {container} from "tsyringe";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import IStatisticTypesRepository
  from "@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository";
import AppError from "@errors/AppError";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";

export default async function UsersSymptoms() {
  const establishmentRepository = container.resolve<IEstablishmentsRepository>(
    "EstablishmentsRepository"
  );
  const diariesRepository = container.resolve<IDiariesRepository>(
    "DiariesRepository"
  );
  const statisticsRepository = container.resolve<IStatisticsRepository>(
    "StatisticsRepository"
  );
  const statisticTypesRepository = container.resolve<IStatisticTypesRepository>(
    "StatisticTypesRepository"
  );
  const establishments = await establishmentRepository.findAllWithUsers();

  const symptoms = [
    {column: "smellLoss", name: "Perda de olfato", type: {}},
    {column: "tasteLoss", name: "Perda de paladar", type: {}},
    {column: "appetiteLoss", name: "Perda de apetite", type: {}},
    {column: "fatigue", name: "Cansaço", type: {}},
    {column: "fever", name: "Febre", type: {}},
    {column: "cough", name: "Tosse persistente", type: {}},
    {column: "diarrhea", name: "Diarréia", type: {}},
    {column: "delirium", name: "Delírios", type: {}},
    {column: "soreThroat", name: "Rouquidão", type: {}},
    {column: "shortnessOfBreath", name: "Falta de ar", type: {}},
    {column: "abdominalPain", name: "Dor abdominal", type: {}},
    {column: "chestPain", name: "Dor torácica", type: {}},
  ];

  const symptomsTotal = [
    {column: "smellLoss", name: "Total perda de olfato", type: {}},
    {column: "tasteLoss", name: "Total perda de paladar", type: {}},
    {column: "appetiteLoss", name: "Total perda de apetite", type: {}},
    {column: "fatigue", name: "Total cansaço", type: {}},
    {column: "fever", name: "Total febre", type: {}},
    {column: "cough", name: "Total tosse persistente", type: {}},
    {column: "diarrhea", name: "Total diarréia", type: {}},
    {column: "delirium", name: "Total delírios", type: {}},
    {column: "soreThroat", name: "Total rouquidão", type: {}},
    {column: "shortnessOfBreath", name: "Total falta de ar", type: {}},
    {column: "abdominalPain", name: "Total dor abdominal", type: {}},
    {column: "chestPain", name: "Total dor torácica", type: {}},
  ];


  for (const symptom of symptoms) {
    let type = await statisticTypesRepository.findByName(symptom.name);

    if (!type) {
      throw new AppError(
        `Tipo de Estatística ${symptom.name} não encontrada`,
        404
      );
    }
    symptom.type = type;
  }
  for (const symptom of symptomsTotal) {
    let type = await statisticTypesRepository.findByName(symptom.name);

    if (!type) {
      throw new AppError(
        `Tipo de Estatística ${symptom.name} não encontrada`,
        404
      );
    }
    symptom.type = type;
  }

  let occurrences = 0;
  let allOccurrences = 0;
  let totalSymptom = [];

  const establishment = establishments[0]
  establishment.users = await KeycloakAdmin.usersListComplete();

  for (const symptom of symptoms) {
    allOccurrences = 0;
    totalSymptom = symptomsTotal.filter((sym) => {
      return sym.column === symptom.column;
    });

    occurrences = 0;

    for (const user of establishment.users) {
      const diary = await diariesRepository.findBySymptomByUser(
        symptom.column,
        user.id
      );
      if (diary) {
        occurrences++;
      }
    }

    allOccurrences += occurrences;

    await statisticsRepository.create({
      establishment: establishment,
      //@ts-ignore
      statisticType: symptom.type,
      value: occurrences,
    });


    await statisticsRepository.create({
      establishment: establishment,
      //@ts-ignore
      statisticType: totalSymptom[0].type,
      value: allOccurrences,
    });
  }
}
