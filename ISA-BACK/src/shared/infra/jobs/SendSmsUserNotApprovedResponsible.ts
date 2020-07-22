import ISendSmsUserNotApprovedDTO from "./dtos/ISendSmsUserNotApprovedDTO";
import SmsConfigSingleton from "@shared/container/providers/SmsProvider/singleton/SmsConfigSingleton";

export default async function SendSmsUserNotApprovedResponsible({
  name,
  attended,
  phone,
}: ISendSmsUserNotApprovedDTO) {

  if(SmsConfigSingleton.getIsActive())
    await SmsConfigSingleton.sendSms({
      msg: `Olá ${name}, o usuário ${attended} apresentou alguns sintomas.`,
      to: {
        phone,
      },
    });
}
