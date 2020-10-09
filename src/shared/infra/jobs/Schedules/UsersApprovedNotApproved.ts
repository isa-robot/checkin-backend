import {container} from "tsyringe";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import {subDays} from "date-fns";
import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import IStatisticTypesRepository
  from "@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository";
import AppError from "@errors/AppError";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";

export default async function UsersApprovedNotApproved() {
  const date = subDays(new Date(), 1);

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
  const typeNotApproved = await statisticTypesRepository.findByName(
    "Não Aprovados"
  );
  const typeApproved = await statisticTypesRepository.findByName("Aprovados");

  const typeAllNotApproved = await statisticTypesRepository.findByName(
    "Total não aprovados"
  );
  const typeAllApproved = await statisticTypesRepository.findByName(
    "Total aprovados"
  );


  if (!typeApproved) {
    throw new AppError("Tipo de Estatística Aprovada não encontrada", 404);
  }

  if (!typeNotApproved) {
    throw new AppError("Tipo de Estatística Não Aprovada não encontrada", 404);
  }

  if (!typeAllApproved) {
    throw new AppError(
      "Tipo de Estatística Total Aprovada não encontrada",
      404
    );
  }

  if (!typeAllNotApproved) {
    throw new AppError(
      "Tipo de Estatística Total Não Aprovada não encontrada",
      404
    );
  }

  let approved = 0;
  let notApproved = 0;
  let totalUsers = 0;
  let totalApproved = 0;
  let totalNotApproved = 0;
  let allUsers = 0;

  const establishment = establishments[0];
  establishment.users = await KeycloakAdmin.usersListComplete();

  approved = 0;
  notApproved = 0;
  totalUsers = establishment.users.length;
  for (const user of establishment.users) {
    const diary = await diariesRepository.findByRangeDateByUser(
      date,
      user.id
    );
    if (diary) {
      if (diary.approved) {
        approved++;
      } else {
        notApproved++;
      }
    }
  }

  totalApproved += approved;
  totalNotApproved += notApproved;
  allUsers += totalUsers;

  if (totalUsers > 0) {
    approved = (approved / totalUsers) * 100;
    notApproved = (notApproved / totalUsers) * 100;
  }

  await statisticsRepository.create({
    establishment,
    statisticType: typeApproved,
    value: approved,
  });

  await statisticsRepository.create({
    establishment,
    statisticType: typeNotApproved,
    value: notApproved,
  });

  totalApproved = (totalApproved / allUsers) * 100;
  totalNotApproved = (totalNotApproved / allUsers) * 100;

  await statisticsRepository.create({
    establishment,
    statisticType: typeAllApproved,
    value: totalApproved,
  });

  await statisticsRepository.create({
    establishment,
    statisticType: typeAllNotApproved,
    value: totalNotApproved,
  });
}
