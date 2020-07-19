import { container } from "tsyringe";
import path from "path";
import ISendMailErrorDTO from "./dtos/ISendMailErrorDTO";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";

export default async function SendMailError({
  to,
  data,
}: ISendMailErrorDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "Error.hbs"
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
