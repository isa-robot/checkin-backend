import ICreateMailerSesConfigDTO from "@shared/container/providers/MailsProvider/dtos/ICreateMailerSesConfigDTO"
import MailerSes from "@shared/container/providers/MailsProvider/infra/typeorm/entities/MailerSes";

export default interface IMailerSesRepository {
  create(config: ICreateMailerSesConfigDTO): Promise<MailerSes>;
  findMailConfig(): Promise<MailerSes[]>;
  save(mailerSes: MailerSes): Promise<MailerSes>;
  remove(mailerSes: MailerSes): Promise<MailerSes>;
}
