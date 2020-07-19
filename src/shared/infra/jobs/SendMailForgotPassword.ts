import path from "path";
import ISenMailForgotPasswordDTO from "./dtos/ISenMailForgotPasswordDTO";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";

export default async function SendMailForgotPassword({
  to,
  data,
}: ISenMailForgotPasswordDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "ForgotPassword.hbs"
  );
  if(MailerConfigSingleton.isActive)
    await MailerConfigSingleton.sendMail({
      to,
      subject: "Recuperação de Senha",
      templateData: {
        file: template,
        variables: data,
      }
    });
}
