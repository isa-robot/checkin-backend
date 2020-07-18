import { inject, injectable } from "tsyringe";

import MailerEthereal from "@messages/infra/typeorm/entities/MailerEthereal";
import IMailerEtherealRepository from "@messages/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@modules/messages/repositories/IMailerSesRepository";

interface Request {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
  address: string;
  subject: string;
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
      address,
      subject
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
      mailer.subject = subject

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
        address,
        subject
      });
      return mailerEthereal;
    }
  }
}

export default CreateMailerEtherealService;
