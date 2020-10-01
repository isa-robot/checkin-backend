import {subDays} from "date-fns";
import {container} from "tsyringe";
import ShowProtocolsActive from "@protocols/services/ShowProtocolsActive";
import AppError from "@errors/AppError";
import DateHelper from "@shared/helpers/dateHelper";
import UpdateProtocol from "@protocols/services/UpdateProtocol";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import ShowBaselineService from "@users/baselines/services/ShowBaselineService";
import MailerDestinatariesSingleton
  from "@shared/container/providers/MailsProvider/singleton/MailerDestinatariesSingleton";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";

export default async function UsersWithProtocolActiveSchedule() {
  const date = subDays(new Date(), 1);
  const dateHelper = new DateHelper()

  const updateProtocol = container.resolve(UpdateProtocol)

  const showProtocolsActive = container.resolve(ShowProtocolsActive)
  const protocolsActive = await showProtocolsActive.execute();

  if(!protocolsActive) {
    throw new AppError("não há protocolos ativos", 404)
  }

  const queue = container.resolve<IQueueProvider>("QueueProvider");

  const mailerSender = await MailerConfigSingleton;

  for await (const protocolActive of protocolsActive) {
    if (dateHelper.dateToStringBR(protocolActive.protocolEndDate) <= dateHelper.dateToStringBR(new Date())){
      protocolActive.active = false;
      await updateProtocol.execute(protocolActive)
    }else{

      const user = await KeycloakAdmin.getUserById(protocolActive.userId)
      console.info(user)
      queue.runJob("SendMailUserProtocolActive", {
        to: user.email ? user.email : "",
        from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
        data: {
          name: "Protocolo Pendente"
        },
      });
    }
  }
}
