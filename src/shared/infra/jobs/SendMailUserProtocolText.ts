import { container } from "tsyringe";
import path from "path";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import ISendMailUserProtocolTextDTO from "@shared/infra/jobs/dtos/ISendMailUserProtocolTextDTO";

export default async function SendMailUserProtocolText({
  to,
  data,
}: ISendMailUserProtocolTextDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "UserProtocolText.hbs"
  );

  if(MailerConfigSingleton.getIsActive())
    await MailerConfigSingleton.sendMail({
      to,
      subject: "AVISO - Email de usuário!",
      templateData: {
        file: template, variables: data
      }
    });
}
