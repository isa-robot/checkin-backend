import {Transporter} from "nodemailer";
import {inject} from "tsyringe";
import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

class MailerConfigSingleton {
  transporter: Transporter
  config: any
  constructor() {

  }

  public sendMail(to:string, subject: string, dataTemplate:any){
    // this.transporter.use('compile', hbs())
    this.transporter.sendMail({
      from: {
        name: this.config.name,
        address: this.config.address
      },
      to: to,
      subject: subject,
      html: dataTemplate
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
