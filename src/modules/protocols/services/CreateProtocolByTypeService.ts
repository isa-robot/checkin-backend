import { inject, injectable, container } from "tsyringe";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import protocolName from "@protocols/dtos/IProtocolName";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";

interface Request {
  diary: Diary,
  userId: string,
  protocol: protocolName
}

@injectable()
class CreateProtocolByTypeService {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository,
  ) { }

  public async execute(
    data: Request,
  ) {

    const protocolByType = await this.protocolRepository.findProtocolActiveByNameByUser(data.userId, data.protocol.protocolName)

    const protocolEndDate = new Date()
    protocolEndDate.setDate(new Date().getDate() + data.protocol.period)

    if(!protocolByType) {

      const queue = container.resolve<IQueueProvider>("QueueProvider");

      const user = await KeycloakAdmin.getUserById(data.userId);
      const mailerSender = await MailerConfigSingleton;

      await queue.runJob("SendMailUserProtocolByDay", {
        to: user.email ? { address: user.email, name: user.firstName } : "",
        from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
        data: {
          name: user.firstName,
          frontendUrl: process.env.FRONT_URL + "/avaliacoes"
        },
      });

      await this.protocolRepository.create({
        diary: data.diary,
        userId: data.userId,
        protocolEndDate: protocolEndDate,
        protocolName: data.protocol.protocolName,
        active: true
      });
    }
  }
}

export default CreateProtocolByTypeService;
