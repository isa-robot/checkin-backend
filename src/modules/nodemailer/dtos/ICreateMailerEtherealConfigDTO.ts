import mailerConfig from "@nodemailer/dtos/mailerConfig";

export default interface ICreateMailerEtherealConfigDTO extends mailerConfig{
  type: string
  host: string;
  port: number;
  user: string;
  pass: string;
}
