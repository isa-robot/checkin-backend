import ICreateMailerSesConfigDTO from "@nodemailer/dtos/ICreateMailerSesConfigDTO"
import MailerSes from "@nodemailer/infra/typeorm/entities/MailerSes";

export default interface IMailerSesRepository {
  create(config: ICreateMailerSesConfigDTO): Promise<MailerSes>;
  findMailConfig(): Promise<MailerSes[]>;
  save(mailerSes: MailerSes): Promise<MailerSes>;
  remove(mailerSes: MailerSes): Promise<MailerSes>;
}
