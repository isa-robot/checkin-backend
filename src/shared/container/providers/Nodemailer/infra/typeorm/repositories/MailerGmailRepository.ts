import { getRepository, Repository, Not } from "typeorm";
import IMailerRepository from "@shared/container/providers/Nodemailer/repositories/IMailerRepository";
import MailerEthereal from "../entities/MailerEthereal";
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO";

class MailerGmailRepository implements IMailerRepository {
  private ormRepository: Repository<MailerEthereal>;

  constructor() {
    this.ormRepository = getRepository(MailerEthereal);
  }

  public async create(data: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal> {
    const mailerGmail = this.ormRepository.create(data);

    await this.ormRepository.save(mailerGmail);

    return mailerGmail;
  }

}

export default MailerGmailRepository;
