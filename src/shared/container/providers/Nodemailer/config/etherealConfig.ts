import path from 'path'
import nodemailer from 'nodemailer'
//@ts-ignore
import hbs from 'nodemailer-express-handlebars'
import ICreateMailerEtherealConfigDTO from '@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO'

class etherealConfig {

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

  public async sendMail(){
    this.transporter.use('compile', hbs())
    await this.transporter.sendMail({
      from: this.config.from,
      to: "erick-mp@hotmail.com",
      subject: this.config.subject,
      text: "algo aqui"
    }, (error:any, info:any) => {
      if(error)
        return console.info(error)
      console.info('Message sent: ' + info)
    })
  }
}
