
//@ts-ignore
import * as zenvia from '@zenvia/sdk';
import ISendSmsDTO from "../dtos/ISendSmsDTO";
import ISmsConfigDTO from "@shared/container/providers/SmsProvider/dtos/ISmsConfigDTO";

class ZenviaSmsProvider{

  public isActive: boolean = false
  private config: ISmsConfigDTO
  private client: any
  private chanel: any

  constructor() {
  }

  public setConfig(config: ISmsConfigDTO){
    this.config = config
    this.client = new zenvia.Client(this.config.zenviaSecretKey)
    this.chanel = this.client.getChannel(this.config.chanel)
  }

  public getConfig(){
    return this.config.from
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
    return this.chanel.sendMessage(this.config.from, to, messageContent)
  }
}

export default new ZenviaSmsProvider()
