import { inject, injectable } from "tsyringe";

import MailerDestinataries from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerDestinataries";
import IMailerDestinatariesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";
import IMailerEtherealRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";
import AppError from "@errors/AppError";

interface Request {
  id: string
}

@injectable()
class RemoveMailerDestinatariesService {
  constructor(
    @inject("MailerDestinatariesRepository")
    private mailerDestinatariesRepository: IMailerDestinatariesRepository
  ) { }

  public async execute({
                         id
                       }:Request): Promise<MailerDestinataries>{
    const destinatary = await this.mailerDestinatariesRepository.findDestinatariesById(id)
    if(destinatary){
      const removeDestinatary = await this.mailerDestinatariesRepository.removeOne(destinatary)
      return removeDestinatary
    }else{
      throw new AppError("destinatary not found", 500)
    }
  }
}

export default RemoveMailerDestinatariesService
