import path from 'path'
import nodemailer from 'nodemailer'
//@ts-ignore
import hbs from 'nodemailer-express-handlebars'
import ICreateMailerEtherealConfigDTO from '@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO'

export default class EtherealConfig {

  private config:ICreateMailerEtherealConfigDTO
  transporter: any

  constructor(dataConfig: ICreateMailerEtherealConfigDTO) {
    this.config = dataConfig
    this.createTransport()
  }

  private createTransport(){
    this.transporter = nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      auth: {
        user: this.config.user,
        pass: this.config.pass
      }
    })
  }

  public sendMail(to:string){
    // this.transporter.use('compile', hbs())
    this.transporter.sendMail({
      from: this.config.from,
      to: to,
      subject: this.config.subject,
      text: "algo aqui"
    }, (error:any, info: any) =>{
      if(error) {
        return error
      }else {
        return info
      }

    })
  }
}
