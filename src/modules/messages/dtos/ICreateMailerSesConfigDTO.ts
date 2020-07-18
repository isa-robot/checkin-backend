import mailerConfig from "@messages/dtos/mailerConfig";

export default interface ICreateMailerConfigDTO extends mailerConfig{
  type:string
  accessKeyId: string;
  secretAccessKey: string;
  region: string
}
