import path from "path";
import ISendMailUserNotApprovedDTO from "./dtos/ISendMailUserNotApprovedDTO";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";

export default async function SendMailUserNotApprovedResponsible({
  to,
  data,
}: ISendMailUserNotApprovedDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "UserNotApprovedResponsible.hbs"
  );
  if(MailerConfigSingleton.isActive)
    await MailerConfigSingleton.sendMail({
      to,
      subject: "AVISO - Sintomas!",
      templateData: {
        file: template,
        variables: data,
      },
    });
}
