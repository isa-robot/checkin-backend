import MailerEthereal from "@messages/infra/typeorm/entities/MailerEthereal";
import ICreateMailerEtherealConfigDTO from "@messages/dtos/ICreateMailerEtherealConfigDTO"

export default interface IMailerEtherealRepository {
  create(config: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal>;
  findMailConfig(): Promise<MailerEthereal[]>;
  save(config: MailerEthereal): Promise<MailerEthereal>;
  remove(mailerEtherea:MailerEthereal): Promise<MailerEthereal>
}
