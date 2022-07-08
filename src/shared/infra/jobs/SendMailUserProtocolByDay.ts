import path from "path";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import ISendMailUserProtocolByDayDTO from "@shared/infra/jobs/dtos/ISendMailUserProtocolByDayDTO";

export default async function SendMailUserProtocolByDay({
  to,
  data,
}: ISendMailUserProtocolByDayDTO) {
  const template = path.resolve(
    __dirname,
    "views",
    "UserProtocolByDay.hbs"
  );

  if(MailerConfigSingleton.getIsActive())
    await MailerConfigSingleton.sendMail({
      to,
      subject: "AVISO - Protocolo disponível!",
      templateData: {
        file: template, variables: data
      }
    });
}
