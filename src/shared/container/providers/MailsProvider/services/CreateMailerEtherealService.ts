import { inject, injectable } from "tsyringe";

import MailerEthereal from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerEthereal";
import IMailerEtherealRepository from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";

interface Request {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
  address: string;
}

@injectable()
class CreateMailerEtherealService {
  constructor(
    @inject("MailerEtherealRepository")
    private mailerEtherealRepository: IMailerEtherealRepository,
    @inject("MailerSesRepository")
    private mailerSesRepository: IMailerSesRepository
  ) { }

  public async execute({
                         host,
                         port,
                         user,
                         pass,
                         name,
                         address
                       }:Request): Promise<MailerEthereal>{

    const checkSesMails = await this.mailerSesRepository.findMailConfig()
    if(checkSesMails.length > 0){
      const deleteSesMail = await this.mailerSesRepository.remove(checkSesMails[0])
    }
    const checkEtherealMails = await this.mailerEtherealRepository.findMailConfig()
    if (checkEtherealMails.length > 0) {
      const mailer = checkEtherealMails[0]
      mailer.type = "ethereal"
      mailer.host = host
      mailer.port = port
      mailer.user = user
      mailer.pass = pass
      mailer.name = name
      mailer.address = address

      const updateEtherealMails = await this.mailerEtherealRepository.save(mailer)
      return updateEtherealMails

    } else {
      const mailerEthereal = await this.mailerEtherealRepository.create({
        type: 'ethereal',
        host,
        port,
        user,
        pass,
        name,
        address
      });
      return mailerEthereal;
    }
  }
}

export default CreateMailerEtherealService;
