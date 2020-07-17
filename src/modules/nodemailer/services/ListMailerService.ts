import { inject, injectable } from 'tsyringe';
import IMailerEtherealRepository from "@nodemailer/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@nodemailer/repositories/IMailerSesRepository";
import MailerEthereal from "@nodemailer/infra/typeorm/entities/MailerEthereal";
import MailerSes from "@nodemailer/infra/typeorm/entities/MailerSes";

@injectable()
class ListMailerService {
  constructor(
    @inject('MailerEtherealRepository')
    private mailerEthereal: IMailerEtherealRepository,
    @inject('MailerSesRepository')
    private mailerSes: IMailerSesRepository,
  ) { }

  public async execute(): Promise<MailerEthereal|MailerSes|any> {
    const mailerEthereals = await this.mailerEthereal.findMailConfig();
    if(mailerEthereals.length > 0) {
      return mailerEthereals[0]
    }
    const mailerSes = await this.mailerSes.findMailConfig()
    if(mailerSes.length > 0){
      return mailerSes[0]
    }
    return false
  }
}

export default ListMailerService;
