import SmsConfigSingleton from "@shared/container/providers/SmsProvider/singleton/SmsConfigSingleton";
import ISendSmsUserProtocolDTO from "@shared/infra/jobs/dtos/ISendSmsUserProtocolDTO";

export default async function SendSmsUserProtocol({
  name,
  attended,
  establishment,
  phone,
}: ISendSmsUserProtocolDTO) {

  if(SmsConfigSingleton.getIsActive())
    await SmsConfigSingleton.sendSms({
      msg: `Olá ${name}, o usuário ${attended} do estabelecimento ${establishment}, Respondeu ao protocolo diario.`,
      to: {
        phone,
      },
    });
}
