import mailerConfigDTO from "@shared/container/providers/MailsProvider/dtos/mailerConfigDTO";

export default interface IMailerSesConfigDTO extends mailerConfigDTO{
  type:string
  accessKeyId: string;
  secretAccessKey: string;
  region: string
}
