import { getRepository, Repository, Not } from "typeorm";
import MailerSes from '../entities/MailerSes'
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO";
import ICreateMailerSesConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerSesConfigDTO";
import IMailerSesRepository from "@shared/container/providers/Nodemailer/repositories/IMailerSesRepository";

class MailerSesRepository implements IMailerSesRepository {
  private ormRepository: Repository<MailerSes>

  constructor() {
    this.ormRepository = getRepository(MailerSes);
  }

  public async create(data: ICreateMailerSesConfigDTO): Promise<MailerSes> {
    const mailerEthereal = this.ormRepository.create(data);

    await this.ormRepository.save(mailerEthereal);

    return mailerEthereal;
  }

  public async findMailConfig(): Promise<MailerSes[]> {
    const sesMails = this.ormRepository.find()

    return sesMails
  }
  public async save(mailerSes: MailerSes): Promise<MailerSes> {
    return await this.ormRepository.save(mailerSes)
  }

  public async remove(mailerSes: MailerSes): Promise<MailerSes>{
    return await this.ormRepository.remove(mailerSes)
  }

}

export default MailerGmailRepository;
