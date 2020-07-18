import mailerConfigDTO from "@shared/container/providers/MailsProvider/dtos/mailerConfigDTO";

export default interface ICreateMailerEtherealConfigDTO extends mailerConfigDTO{
  type: string
  host: string;
  port: number;
  user: string;
  pass: string;
}
