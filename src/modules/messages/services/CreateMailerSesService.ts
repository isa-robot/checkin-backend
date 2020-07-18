import { inject, injectable } from "tsyringe";

import IMailerEtherealRepository from "@messages/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@messages/repositories/IMailerSesRepository";
import MailerSes from "@messages/infra/typeorm/entities/MailerSes";

interface Request {
  accessKeyId: string;
  secretAccessKey: string;
  region: string
  name: string;
  address: string;
}

@injectable()
class CreateMailerSesService {
  constructor(
    @inject("MailerSesRepository")
    private mailerSesRepository: IMailerSesRepository,

    @inject("MailerEtherealRepository")
    private mailerEtherealRepository: IMailerEtherealRepository
  ) { }

  public async execute({
      accessKeyId,
      secretAccessKey,
      region,
      name,
      address,
   }:Request): Promise<MailerSes>{

    const checkEtherealMails = await this.mailerEtherealRepository.findMailConfig()

    if(checkEtherealMails.length > 0){
      const deleteEtherealMail = await this.mailerEtherealRepository.remove(checkEtherealMails[0])
      console.info("deleted:", deleteEtherealMail)
    }

    const checkSesMails = await this.mailerSesRepository.findMailConfig()

    if (checkSesMails.length > 0) {
      const mail: MailerSes = checkSesMails[0]
      mail.type = "ses"
      mail.accessKeyId = accessKeyId
      mail.secretAccessKey = secretAccessKey
      mail.region = region
      mail.name = name
      mail.address = address

      const updateSesMails = await this.mailerSesRepository.save(mail)
      return updateSesMails
    } else {
      const mailerSes = await this.mailerSesRepository.create({
        type: "ses",
        accessKeyId,
        secretAccessKey,
        name,
        address,
        region
      });
      return mailerSes;
    }
  }
}

export default CreateMailerSesService;
