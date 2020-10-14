import {subDays} from "date-fns";
import {container} from "tsyringe";
import ShowProtocolsActive from "@protocols/services/ShowProtocolsActive";
import AppError from "@errors/AppError";
import DateHelper from "@shared/helpers/dateHelper";
import UpdateProtocol from "@protocols/services/UpdateProtocol";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";

export default async function usersProtocolByDaySchedule() {

  const updateProtocol = container.resolve(UpdateProtocol)

  const showProtocolsActive = container.resolve(ShowProtocolsActive)
  const protocolsActive = await showProtocolsActive.execute();

  if(!protocolsActive) {
    throw new AppError("não há protocolos ativos", 404)
  }

  const queue = container.resolve<IQueueProvider>("QueueProvider");
  const mailerSender = await MailerConfigSingleton;
  for await (const protocolActive of protocolsActive) {

    const protocolEndDate = new DateHelper().dateToStringBR(new Date(protocolActive.protocolEndDate))
    const protocolEndDateReverse = new Date(protocolEndDate.split("/").reverse().join("/"))

    const today = new DateHelper().dateToStringBR(new Date())
    const todayReverse = new Date(today.split("/").reverse().join("/"))

    if ( protocolEndDateReverse >= todayReverse ){
      const user = await KeycloakAdmin.getUserById(protocolActive.userId)
      await queue.runJob("SendMailUserProtocolByDay", {
        to: user.email ? { address: user.email, name: user.firstName } : "",
        from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
        data: {
          name: user.firstName,
          frontendUrl: process.env.FRONT_URL + "/protocolos"
        },
      });
    }else{
      protocolActive.active = false;
      await updateProtocol.execute(protocolActive)
    }
  }
}
