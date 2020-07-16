import MailerEthereal from "@shared/container/providers/Nodemailer/infra/typeorm/entities/MailerEthereal";
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO"
import ICreateMailerSesConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerSesConfigDTO"

export default interface IMailerRepository {
  createEtheral(config: ICreateMailerEtherealConfigDTO): Promise<MailerEthereal>;
  createSes(config: ICreateMailerSesConfigDTO): promise<MailerEthereal>;
}
