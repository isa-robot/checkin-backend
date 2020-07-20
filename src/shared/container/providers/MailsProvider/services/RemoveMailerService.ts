import { inject, injectable } from 'tsyringe';
import MailerEthereal from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerEthereal";
import MailerSes from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerSes";
import IMailerEtherealRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository";
import IMailerSesRepository from "@shared/container/providers/MailsProvider/repositories/IMailerSesRepository";
import AppError from "@errors/AppError";
import IMailerDestinatariesRepository
  from "@shared/container/providers/MailsProvider/repositories/IMailerDestinatariesRepository";

@injectable()
class RemoveMailerService {

  constructor(
    @inject('MailerEtherealRepository')
    private mailerEtherealRepository: IMailerEtherealRepository,
    @inject('MailerSesRepository')
    private mailerSesRepository: IMailerSesRepository,
    @inject('MailerDestinatariesRepository')
    private mailerDestinatariesRepository: IMailerDestinatariesRepository
  ) { }

  public async execute(): Promise<MailerEthereal | MailerSes> {
    const mailerEthereal = await this.mailerEtherealRepository.findMailConfig()
    const mailerSes = await this.mailerSesRepository.findMailConfig()
    const mailerDestinataries = await this.mailerDestinatariesRepository.findDestinataries()

    if(mailerEthereal.length > 0){
      const deleteMailerEthereal = await this.mailerEtherealRepository.remove(mailerEthereal[0])
      if(mailerDestinataries.length > 0)
        await this.mailerDestinatariesRepository.remove(mailerDestinataries)
      return deleteMailerEthereal
    }else if(mailerSes.length > 0){
      const deleteMailerSes = await this.mailerSesRepository.remove(mailerSes[0])
      if(mailerDestinataries.length > 0)
        await this.mailerDestinatariesRepository.remove(mailerDestinataries)
      return deleteMailerSes
    }else{
      throw new AppError("nothing to delete",500)
    }
  }
}

export default RemoveMailerService;
