import { container } from "tsyringe";
import path from "path";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import ISendMailUserProtocolDTO from "@shared/infra/jobs/dtos/ISendMailUserProtocolDTO";

export default async function SendMailUserProtocolActive({
  to,
  data,
}: ISendMailUserProtocolDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "UserNotApproved.hbs"
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
