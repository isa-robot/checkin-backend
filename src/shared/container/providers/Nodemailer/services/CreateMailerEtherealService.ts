import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import IMailerRepository from "@shared/container/providers/Nodemailer/repositories/IMailerEtherealRepository";
import MailerEthereal from "@shared/container/providers/Nodemailer/infra/typeorm/entities/MailerEthereal";
import IMailerEtherealRepository from "@shared/container/providers/Nodemailer/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/Nodemailer/repositories/IMailerSesRepository";

interface Request {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  subject: string;
  mailer: MailerEthereal
}

@injectable()
class CreateMailerEtherealService {
  constructor(
    @inject("IMailerEtherealRepository")
    private mailerEtherealRepository: IMailerEtherealRepository,
    @inject("IMailerSesRepository")
    private mailerSesRepository: IMailerSesRepository
  ) { }

  public async execute({
      host,
      port,
      user,
      pass,
      from,
      subject,
      mailer
   }:Request): Promise<MailerEthereal>{

    const checkSesMails = await this.mailerSesRepository.findMailConfig()

    if(checkSesMails){
      const deleteSesMail = await this.mailerSesRepository.remove(checkSesMails[0])
    }

    const checkEtherealMails = await this.mailerEtherealRepository.findMailConfig()

    if (checkEtherealMails) {

      mailer.host = host;
      mailer.port = port;
      mailer.user = user;
      mailer.pass = pass;
      mailer.from = from;
      mailer.subject = subject

      const updateEtherealMails = await this.mailerEtherealRepository.save(mailer)
      return updateEtherealMails

    } else {
      const mailerEthereal = await this.mailerEtherealRepository.create({
        host,
        port,
        user,
        pass,
        from,
        subject
      });
      return mailerEthereal;
    }
  }
}

export default CreateMailerEtherealService;
