import MailerEthereal from "@nodemailer/infra/typeorm/entities/MailerEthereal";
import ICreateMailerEtherealConfigDTO from "@nodemailer/dtos/ICreateMailerEtherealConfigDTO"

export default interface IMailerEtherealRepository {
  create(config: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal>;
  findMailConfig(): Promise<MailerEthereal[]>;
  save(config: MailerEthereal): Promise<MailerEthereal>;
  remove(mailerEtherea:MailerEthereal): Promise<MailerEthereal>
}
