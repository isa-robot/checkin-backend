import { inject, injectable } from "tsyringe";

import MailerDestinataries from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerDestinataries";
import IMailerDestinatariesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";
import IMailerEtherealRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";
import AppError from "@errors/AppError";
import DestinataryTypeEnum from "@shared/container/providers/MailsProvider/enums/DestinataryTypeEnum";

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
      if(  destinatary_type == DestinataryTypeEnum.SUPORT
        || destinatary_type == DestinataryTypeEnum.USERSNOTAPPROVED
        || destinatary_type == DestinataryTypeEnum.HEALTHSERVICE ){

        const checkDestinataries = await this.mailerDestinatariesRepository.findDestinatariesByTypeByAddress(destinatary_type, address)
        if (!checkDestinataries) {
          const mailerDestinatary = await this.mailerDestinatariesRepository.create({
            destinatary_type,
            name,
            address
          });
          return mailerDestinatary;
        } else {
          throw new AppError("Destinatario já está registrado", 409)
        }

      }else{
        throw new AppError("Tipo de email não foi definido", 500)
      }
    }else{
      throw new AppError("Remetente não está configurado", 500)
    }
  }
}

export default CreateMailerDestinatariesService;
