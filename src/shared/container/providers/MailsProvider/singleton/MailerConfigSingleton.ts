import {Transporter} from "nodemailer";
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailsProvider/providers/HandlebarsMailTemplate'
import ISendMailDTO from '@shared/container/providers/MailsProvider/dtos/ISendMailDTO'
import ICreateMailerSesConfigDTO from "@shared/container/providers/MailsProvider/dtos/ICreateMailerSesConfigDTO";
import ICreateMailerEtherealConfigDTO from "@shared/container/providers/MailsProvider/dtos/ICreateMailerEtherealConfigDTO";
import path from "path";

class MailerConfigSingleton {

  public isActive: boolean;
  private transporter: Transporter
  private mailTemplateProvider = HandlebarsMailTemplateProvider
  private config: ICreateMailerSesConfigDTO | ICreateMailerEtherealConfigDTO
  constructor() {
  }

  public getConfig(){
    return { address: this.config.address, name: this.config.name }
  }

  public setTransporter(transporter: Transporter){
    this.transporter = transporter
  }

  public setConfig(config: ICreateMailerEtherealConfigDTO | ICreateMailerSesConfigDTO){
    this.config = config
  }

  public async sendMail({to, subject, templateData}: ISendMailDTO ){
    this.transporter.sendMail({
      from: {
        name: this.config.name,
        address: this.config.address
      },
      to: to,
      subject: subject,
      html: await this.mailTemplateProvider.parse(templateData)
    }, (error:any, info: any) =>{
      if(error) {
        return error
      }else {
        return info
      }
    })
  }
}
export default new MailerConfigSingleton()
