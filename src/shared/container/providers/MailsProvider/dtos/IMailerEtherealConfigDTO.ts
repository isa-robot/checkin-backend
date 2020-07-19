import mailerConfigDTO from "@shared/container/providers/MailsProvider/dtos/mailerConfigDTO";

export default interface IMailerEtherealConfigDTO extends mailerConfigDTO{
  type: string
  host: string;
  port: number;
  user: string;
  pass: string;
}
