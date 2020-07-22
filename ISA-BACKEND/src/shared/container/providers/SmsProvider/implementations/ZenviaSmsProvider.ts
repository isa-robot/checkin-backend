
//@ts-ignore
import * as zenvia from '@zenvia/sdk';
import ISendSmsDTO from "../dtos/ISendSmsDTO";
import ISmsConfigDTO from "@shared/container/providers/SmsProvider/dtos/ISmsConfigDTO";

export default class ZenviaSmsProvider{

  config: ISmsConfigDTO
  client: any
  chanel: any

  constructor(config: ISmsConfigDTO) {
    this.config = config
    this.configZenvia()
  }

  configZenvia() {
    this.client = new zenvia.Client(this.config.zenviaSecretKey)
    this.chanel = this.client.getChannel(this.config.chanel)

  }

  private formatNumber(number: string) {
    const phone = `55${number.replace("(", "").replace(")", "")}`;
    return phone;
  }

  private generateIdentifier(phone: string) {
    return `${phone}${new Date()}`;
  }

  public async sendSms({ msg, to }: ISendSmsDTO) {
    const messageContent = new zenvia.TextContent(msg)
    return this.chanel.sendMessage(this.config.from, this.formatNumber(to.phone), messageContent)
  }
}
