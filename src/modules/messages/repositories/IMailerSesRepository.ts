import ICreateMailerSesConfigDTO from "@messages/dtos/ICreateMailerSesConfigDTO"
import MailerSes from "@messages/infra/typeorm/entities/MailerSes";

export default interface IMailerSesRepository {
  create(config: ICreateMailerSesConfigDTO): Promise<MailerSes>;
  findMailConfig(): Promise<MailerSes[]>;
  save(mailerSes: MailerSes): Promise<MailerSes>;
  remove(mailerSes: MailerSes): Promise<MailerSes>;
}
