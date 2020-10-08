import {container, inject, injectable} from "tsyringe";

import IMailerDestinatariesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";
import IMailerEtherealRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";
import AppError from "@errors/AppError";
import DestinataryTypeEnum from "@shared/container/providers/MailsProvider/enums/DestinataryTypeEnum";
import DateHelper from "@shared/helpers/dateHelper";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import GetMailerDestinataryByTypeService
  from "@shared/container/providers/MailsProvider/services/GetMailerDestinataryByTypeService";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import ShowBaselineService from "@users/baselines/services/ShowBaselineService";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";

interface Request {
  textMail: string;
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
                         textMail
                       }:Request, userId: string, establishment: Establishment){

    if(textMail.length < 1) {
      throw new AppError("sem mensagem", 404)
    }

    const responsible = await KeycloakAdmin.getUsersFromRole("responsible")

    const mailerSender = await MailerConfigSingleton

    const mailerDestinataryByTypeService = container.resolve(GetMailerDestinataryByTypeService)
    const healthServiceMail = await mailerDestinataryByTypeService.execute({type: DestinataryTypeEnum.HEALTHSERVICE})

    const queue = container.resolve<IQueueProvider>("QueueProvider");

    const baseline = container.resolve(ShowBaselineService)
    const user = await baseline.execute(userId)


    queue.runJob("SendMailUserProtocolText", {
      to: healthServiceMail ? {
        name: healthServiceMail.name,
        address: healthServiceMail.address
      } : "",
      from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
      data: {
        name: "Infectologista",
        protocol: {
          name: "cfpng",
        },
        attended: user,
        mailBodyText: textMail,
        establishment: establishment.name,
        responsible: responsible
      },
    });
  }
}

export default SendMailToHealthDestinatary;
