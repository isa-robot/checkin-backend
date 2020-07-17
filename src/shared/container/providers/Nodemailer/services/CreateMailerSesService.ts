import { inject, injectable } from "tsyringe";

import IMailerEtherealRepository from "@shared/container/providers/Nodemailer/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/Nodemailer/repositories/IMailerSesRepository";
import MailerSes from "@shared/container/providers/Nodemailer/infra/typeorm/entities/MailerSes";

interface Request {
  accessKeyId: string;
  secretAccessKey: string;
  from: string;
  subject: string;
  mail: MailerSes;
}

@injectable()
class CreateMailerSesService {
  constructor(
    @inject("IMailerSesRepository")
    private mailerSesRepository: IMailerSesRepository,

    @inject("IMailerEtherealRepository")
    private mailerEtherealRepository: IMailerEtherealRepository
  ) { }

  public async execute({
      accessKeyId,
      secretAccessKey,
      from,
      subject,
      mail
   }:Request): Promise<MailerSes>{

    const checkEtherealMails = await this.mailerEtherealRepository.findMailConfig()

    if(checkEtherealMails){
      const deleteEtherealMail = await this.mailerEtherealRepository.remove(checkEtherealMails[0])
    }

    const checkSesMails = await this.mailerSesRepository.findMailConfig()

    if (checkSesMails) {
      mail.accessKeyId = accessKeyId
      mail.secretAccessKey = secretAccessKey
      mail.from = from
      mail.subject = subject

      const updateSesMails = await this.mailerSesRepository.save(mail)
      return updateSesMails
    } else {
      const mailerSes = await this.mailerSesRepository.create({
        accessKeyId,
        secretAccessKey,
        from,
        subject
      });
      return mailerSes;
    }
  }
}

export default CreateMailerSesService;
