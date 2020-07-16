import MailerEthereal from "@shared/container/providers/Nodemailer/infra/typeorm/entities/MailerEthereal";
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO"
import ICreateMailerSesConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerSesConfigDTO"
import MailerSes from "@shared/container/providers/Nodemailer/infra/typeorm/entities/MailerSes";

export default interface IMailerRepository {
  createEtheral(config: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal>;
  createSes(config: ICreateMailerSesConfigDTO): Promise<MailerSes>;
}
