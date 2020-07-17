import ICreateMailerSesConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerSesConfigDTO"
import MailerSes from "@shared/container/providers/Nodemailer/infra/typeorm/entities/MailerSes";

export default interface IMailerSesRepository {
  create(config: ICreateMailerSesConfigDTO): Promise<MailerSes>;
  findMailConfig(): Promise<MailerSes[]>;
  save(mailerSes: MailerSes): Promise<MailerSes>;
  remove(mailerSes: MailerSes): Promise<MailerSes>;
}
