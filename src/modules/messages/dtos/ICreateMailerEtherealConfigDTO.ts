import mailerConfig from "@messages/dtos/mailerConfig";

export default interface ICreateMailerEtherealConfigDTO extends mailerConfig{
  type: string
  host: string;
  port: number;
  user: string;
  pass: string;
}
