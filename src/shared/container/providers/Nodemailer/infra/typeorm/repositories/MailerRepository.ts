import { getRepository, Repository, Not } from "typeorm";
import IMailerRepository from "@shared/container/providers/Nodemailer/repositories/IMailerRepository";
import MailerEthereal from "../entities/MailerEthereal";
import MailerSes from '../entities/MailerSes'
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO";
import ICreateMailerSesConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerSesConfigDTO";

class MailerRepository implements IMailerRepository {
  private ormRepositoryEthereal: Repository<MailerEthereal>;
  private ormRepositorySes: Repository<MailerSes>

  constructor() {
    this.ormRepositoryEthereal = getRepository(MailerEthereal);
  }

  public async createEtheral(data: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal> {
    const mailerEthereal = this.ormRepositoryEthereal.create(data);

    await this.ormRepositoryEthereal.save(mailerEthereal);

    return mailerEthereal;
  }

  public async createSes(data: ICreateMailerSesConfigDTO): Promise<MailerSes> {
    const mailerSes = this.ormRepositorySes.create(data)

    await this.ormRepositorySes.save(mailerSes)

    return mailerSes;
  }

}

export default MailerGmailRepository;
