import { getRepository, Repository, Not } from "typeorm";
import IMailerRepository from "@modules/nodemailer/repositories/IMailerEtherealRepository";
import MailerEthereal from "../entities/MailerEthereal";
import ICreateMailerEtherealConfigDTO from "@nodemailer/dtos/ICreateMailerEtherealConfigDTO";
import IMailerEtherealRepository from "@nodemailer/repositories/IMailerEtherealRepository";

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
    const mail = this.ormRepository.find()

    return mail;
  }

  public async save(mailerEthereal: MailerEthereal): Promise<MailerEthereal> {
    return await this.ormRepository.save(mailerEthereal);
  }

  public async remove(mailerEthereal: MailerEthereal): Promise<MailerEthereal>{
    return await this.ormRepository.remove(mailerEthereal)
  }

}

export default MailerEtherealRepository;
