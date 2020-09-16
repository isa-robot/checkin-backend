import { container } from "tsyringe";
import path from "path";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import ISendMailUserProtocolDTO from "@shared/infra/jobs/dtos/ISendMailUserProtocolDTO";

export default async function SendMailUserProtocol({
  to,
  data,
}: ISendMailUserProtocolDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "UserProtocol.hbs"
  );

  if(MailerConfigSingleton.getIsActive())
    await MailerConfigSingleton.sendMail({
      to,
      subject: "AVISO - Sintomas!",
      templateData: {
        file: template, variables: data
      }
    });
}
