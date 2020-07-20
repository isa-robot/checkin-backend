
//@ts-ignore
import * as zenvia from '@zenvia/sdk';
import ISendSmsDTO from "../dtos/ISendSmsDTO";
import ISmsConfigDTO from "@shared/container/providers/SmsProvider/dtos/ISmsConfigDTO";
import {bool} from "aws-sdk/clients/signer";

class ZenviaSmsProvider{

  private isActive: boolean = false
  private config: ISmsConfigDTO
  private client: any
  private chanel: any


  public getIsActive(){
    return this.isActive
  }

  public setIsActive(isActive: boolean){
    this.isActive = isActive
  }

  public setConfig(config: ISmsConfigDTO){
    if(config.chanel == "whatsapp" || config.chanel == "sms"){
      this.config = config
      this.client = new zenvia.Client(this.config.zenviaSecretKey)
      this.chanel = this.client.getChannel(this.config.chanel)
    } else {
      this.config = {} as ISmsConfigDTO
      this.client = {}
      this.chanel = {}
    }
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
    return this.chanel.sendMessage(this.config.from, this.formatNumber(to.phone), messageContent)
  }
}

export default new ZenviaSmsProvider()
