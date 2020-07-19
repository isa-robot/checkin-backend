import { container } from "tsyringe";
import path from "path";
import ISendMailJobErrorDTO from "./dtos/ISendMailJobErrorDTO";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";

export default async function SendMailJobError({
  to,
  data,
}: ISendMailJobErrorDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "ErrorJob.hbs"
  );
  if(MailerConfigSingleton.isActive)
    await MailerConfigSingleton.sendMail({
      to,
      subject: "AVISO - Ocorreu um Erro!",
      templateData: {
        file: template,
        variables: data,
      }
    });
}
