import { getRepository, Repository, Not } from "typeorm";
import IMailerRepository from "@shared/container/providers/Nodemailer/repositories/IMailerEtherealRepository";
import MailerEthereal from "../entities/MailerEthereal";
import MailerSes from '../entities/MailerSes'
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO";
import IMailerEtherealRepository from "@shared/container/providers/Nodemailer/repositories/IMailerEtherealRepository";

class MailerEtherealRepository implements IMailerEtherealRepository {

  private ormRepository: Repository<MailerEthereal>

  constructor() {
    this.ormRepository = getRepository(MailerEthereal);
  }

  public async create(data: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal> {
    const mailerEthereal = this.ormRepository.create(data);

    await this.ormRepository.save(mailerEthereal);

    return mailerEthereal;
  }

  public async findMailConfig(): Promise<MailerEthereal[]> {
    const Mail = this.ormRepository.find()

    return Mail;
  }

  public async save(mailerEthereal: MailerEthereal): Promise<MailerEthereal> {
    return await this.ormRepository.save(mailerEthereal);
  }

  public async remove(mailerEthereal: MailerEthereal): Promise<MailerEthereal>{
    return await this.ormRepository.remove(mailerEthereal)
  }

}

export default MailerGmailRepository;
