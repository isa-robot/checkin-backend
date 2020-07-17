import MailerEthereal from "@shared/container/providers/Nodemailer/infra/typeorm/entities/MailerEthereal";
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO"

export default interface IMailerEtherealRepository {
  create(config: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal>;
  findMailConfig(): Promise<MailerEthereal[]>;
  save(config: MailerEthereal): Promise<MailerEthereal>;
  remove(mailerEtherea:MailerEthereal): Promise<MailerEthereal>
}
