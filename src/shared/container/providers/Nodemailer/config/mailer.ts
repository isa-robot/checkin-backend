import path from 'path'
import nodemailer from 'nodemailer'
//@ts-ignore
import hbs from 'nodemailer-express-handlebars'
import ICreateMailerEtherealConfigDTO from '@shared/container/providers/Nodemailer/dtos/ICreateMailerEtherealConfigDTO'

class mailer {

  private config:ICreateMailerEtherealConfigDTO
  transporter: any

  constructor(data: ICreateMailerEtherealConfigDTO) {
    this.config = data
    this.createTransport(this.config)

  }

  createTransport(config:ICreateMailerEtherealConfigDTO){
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      auth: {
        user: config.user,
        pass: config.pass
      }
    })
  }
  async sendMail(){
    this.transporter.use('compile', hbs())
  }
}
