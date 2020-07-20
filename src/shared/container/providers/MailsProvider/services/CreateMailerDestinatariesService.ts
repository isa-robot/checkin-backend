import { inject, injectable } from "tsyringe";

import MailerDestinataries from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerDestinataries";
import IMailerDestinatariesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";
import IMailerEtherealRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";
import AppError from "@errors/AppError";

interface Request {
  destinatary_type: string
  name: string;
  address: string;
}

@injectable()
class CreateMailerDestinatariesService {
  constructor(
    @inject("MailerDestinatariesRepository")
    private mailerDestinatariesRepository: IMailerDestinatariesRepository,
    @inject("MailerEtherealRepository")
    private mailerEtherealRepository: IMailerEtherealRepository,
    @inject("MailerSesRepository")
    private mailerSesRepository: IMailerSesRepository
  ) { }

  public async execute({
                         destinatary_type,
                         name,
                         address
                       }:Request): Promise<MailerDestinataries>{

    const mailerEthereal = await this.mailerEtherealRepository.findMailConfig()
    const mailerSes = await this.mailerSesRepository.findMailConfig()

    if(mailerEthereal.length > 0 || mailerSes.length > 0){
      if(destinatary_type == "suport" || destinatary_type == "usersNotApproved"){

        const checkDestinataries = await this.mailerDestinatariesRepository.findDestinatariesByType(destinatary_type)

        if (checkDestinataries) {
          const mailerDestinatary = checkDestinataries
          mailerDestinatary.destinatary_type = destinatary_type
          mailerDestinatary.name = name
          mailerDestinatary.address = address
          const mailerDestinataryUpdate = await this.mailerDestinatariesRepository.save(mailerDestinatary)
          return mailerDestinataryUpdate
        } else {
          const mailerDestinatary = await this.mailerDestinatariesRepository.create({
            destinatary_type,
            name,
            address
          });
          return mailerDestinatary;
        }

      }else{
        throw new AppError("mailer type is not defined", 500)
      }
    }else{
      throw new AppError("mailer sender has to be configured first", 500)
    }
  }
}

export default CreateMailerDestinatariesService;
