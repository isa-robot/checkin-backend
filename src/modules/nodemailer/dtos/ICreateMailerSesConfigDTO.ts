import mailerConfig from "@nodemailer/dtos/mailerConfig";

export default interface ICreateMailerConfigDTO extends mailerConfig{
  type:string
  accessKeyId: string;
  secretAccessKey: string;
  region: string
}
