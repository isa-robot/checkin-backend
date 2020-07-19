import ISendSmsUserNotApprovedDTO from "./dtos/ISendSmsUserNotApprovedDTO";
import SmsConfigSingleton from "@shared/container/providers/SmsProvider/singleton/SmsConfigSingleton";

export default async function SendMailUserNotApproved({
  name,
  attended,
  establishment,
  phone,
}: ISendSmsUserNotApprovedDTO) {

  if(SmsConfigSingleton.isActive)
    await SmsConfigSingleton.sendSms({
      msg: `Olá ${name}, o usuário ${attended} do estabelecimento ${establishment}, apresentou alguns sintomas.`,
      to: {
        phone,
      },
    });
}
