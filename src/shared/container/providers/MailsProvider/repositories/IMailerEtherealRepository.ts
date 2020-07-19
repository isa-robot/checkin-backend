import MailerEthereal from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerEthereal";
import IMailerEtherealConfigDTO from "@shared/container/providers/MailsProvider/dtos/IMailerEtherealConfigDTO"

export default interface IMailerEtherealRepository {
  create(config: IMailerEtherealConfigDTO): Promise<MailerEthereal>;
  findMailConfig(): Promise<MailerEthereal[]>;
  save(config: MailerEthereal): Promise<MailerEthereal>;
  remove(mailerEtherea:MailerEthereal): Promise<MailerEthereal>
}
