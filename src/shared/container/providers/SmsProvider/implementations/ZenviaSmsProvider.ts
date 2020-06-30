import ISmsProvider from "../models/ISmsProvider";

//@ts-ignore
import zenvia from "@zenvia/zenvia-sms-core";
import zenviaConfig from "@config/zenvia";
import ISendSmsDTO from "../dtos/ISendSmsDTO";

export default class ZenviaSmsProvider implements ISmsProvider {
  constructor() {
    zenvia.api.setCredentials(
      zenviaConfig.sms.account,
      zenviaConfig.sms.password
    );
  }

  private formatNumber(number: string) {
    const phone = `55${number.replace("(", "").replace(")", "")}`;
    return phone;
  }

  private generateIdentifier(phone: string) {
    return `${phone}${new Date()}`;
  }

  public async sendSms({ msg, to }: ISendSmsDTO) {
    await zenvia.api.sendSMS({
      sendSmsRequest: {
        from: "Qualis",
        to: this.formatNumber(to.phone),
        schedule: null,
        msg,
        callbackOption: "NONE",
        id: this.generateIdentifier(to.phone),
        aggregateId: "001",
      },
    });
  }
}
