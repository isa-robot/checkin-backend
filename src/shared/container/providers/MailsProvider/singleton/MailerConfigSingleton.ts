import {Transporter} from "nodemailer";
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailsProvider/providers/HandlebarsMailTemplate'
import ISendMailDTO from '@shared/container/providers/MailsProvider/dtos/ISendMailDTO'
import ICreateMailerSesConfigDTO from "@shared/container/providers/MailsProvider/dtos/IMailerSesConfigDTO";
import IMailerEtherealConfigDTO from "@shared/container/providers/MailsProvider/dtos/IMailerEtherealConfigDTO";
import path from "path";

class MailerConfigSingleton {

  private isActive: boolean = false
  public transporter: Transporter
  private mailTemplateProvider = HandlebarsMailTemplateProvider
  private config: ICreateMailerSesConfigDTO | IMailerEtherealConfigDTO

  public getIsActive(){
    return this.isActive
  }

  public setIsActive(isActive: boolean){
    this.isActive = isActive
  }

  public getConfig(){
    return { address: this.config.address, name: this.config.name }
  }

  public setTransporter(transporter: Transporter){
    this.transporter = transporter
  }

  public setConfig(config: IMailerEtherealConfigDTO | ICreateMailerSesConfigDTO){
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
