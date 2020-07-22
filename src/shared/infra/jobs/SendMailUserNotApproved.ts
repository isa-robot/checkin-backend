import { container } from "tsyringe";
import path from "path";
import ISendMailUserNotApprovedDTO from "./dtos/ISendMailUserNotApprovedDTO";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";

export default async function SendMailUserNotApproved({
  to,
  data,
}: ISendMailUserNotApprovedDTO) {
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
