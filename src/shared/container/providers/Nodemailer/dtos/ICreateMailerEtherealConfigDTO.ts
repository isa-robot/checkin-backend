import mailerConfig from "@shared/container/providers/Nodemailer/dtos/mailerConfig";

export default interface ICreateMailerEtherealConfigDTO extends mailerConfig{
  host: string;
  port: number;
  user: string;
  pass: string;
}
