import mailerConfigDTO from "@shared/container/providers/MailsProvider/dtos/mailerConfigDTO";

export default interface ICreateMailerConfigDTO extends mailerConfigDTO{
  type:string
  accessKeyId: string;
  secretAccessKey: string;
  region: string
}
