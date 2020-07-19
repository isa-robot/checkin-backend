import { inject, injectable } from 'tsyringe';
import IMailerEtherealRepository from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";
import MailerEthereal from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerEthereal";
import MailerSes from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerSes";

@injectable()
class ListMailerService {
  constructor(
    @inject('MailerEtherealRepository')
    private mailerEthereal: IMailerEtherealRepository,
    @inject('MailerSesRepository')
    private mailerSes: IMailerSesRepository,
  ) { }

  public async execute(): Promise<MailerEthereal|MailerSes> {
    const mailerEthereals = await this.mailerEthereal.findMailConfig();
    if(mailerEthereals.length > 0) {
      return mailerEthereals[0]
    }
    const mailerSes = await this.mailerSes.findMailConfig()
    if(mailerSes.length > 0){
      return mailerSes[0]
    }
    return mailerSes[0] || mailerEthereals[0]
  }
}

export default ListMailerService;
