import {container, inject, injectable} from "tsyringe";

import IMailerDestinatariesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";
import IMailerEtherealRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";
import DestinataryTypeEnum from "@shared/container/providers/MailsProvider/enums/DestinataryTypeEnum";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import GetMailerDestinataryByTypeService
  from "@shared/container/providers/MailsProvider/services/GetMailerDestinataryByTypeService";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import ShowBaselineService from "@users/baselines/services/ShowBaselineService";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";

interface Request {
  protocolName: string;
  textMail: string;
  protocolGenerationDate: string;
}

@injectable()
class SendMailToHealthDestinatary {
  constructor(
    @inject("MailerDestinatariesRepository")
    private mailerDestinatariesRepository: IMailerDestinatariesRepository,
    @inject("MailerEtherealRepository")
    private mailerEtherealRepository: IMailerEtherealRepository,
    @inject("MailerSesRepository")
    private mailerSesRepository: IMailerSesRepository
  ) { }

  public async execute({
                         protocolName,
                         protocolGenerationDate,
                         textMail
                       }:Request, user: any, establishment: Establishment){

    const responsible = await KeycloakAdmin.getUsersFromRole("responsible")

    const mailerSender = await MailerConfigSingleton

    const mailerDestinataryByTypeService = container.resolve(GetMailerDestinataryByTypeService)
    const healthServiceMail = await mailerDestinataryByTypeService.execute({type: DestinataryTypeEnum.HEALTHSERVICE})

    const queue = container.resolve<IQueueProvider>("QueueProvider");

    const baseline = container.resolve(ShowBaselineService);
    const userWithBaseline = await baseline.execute(user.id);

    const newUser = {user: user}

    if(textMail.length > 0){

      await queue.runJob("SendMailUserProtocolText", {
        to: healthServiceMail ? {
          name: healthServiceMail.name,
          address: healthServiceMail.address
        } : "",
        from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
        data: {
          name: "Infectologista",
          protocol: {
            name: protocolName,
            generationDate: protocolGenerationDate
          },
          attended: userWithBaseline.baseline ? userWithBaseline : newUser,
          mailBodyText: textMail,
          establishment: establishment.name,
          responsible: responsible
        },
      });
    }
  }
}

export default SendMailToHealthDestinatary;
