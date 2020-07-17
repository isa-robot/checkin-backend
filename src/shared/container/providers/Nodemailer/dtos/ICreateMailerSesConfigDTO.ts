import mailerConfig from "@shared/container/providers/Nodemailer/dtos/mailerConfig";

export default interface ICreateMailerConfigDTO extends mailerConfig{
  accessKeyId: string;
  secretAccessKey: string;
}
