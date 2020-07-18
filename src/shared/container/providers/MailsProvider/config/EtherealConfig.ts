import path from 'path'
import nodemailer, {Transporter} from 'nodemailer'
//@ts-ignore
import hbs from 'nodemailer-express-handlebars'
import ICreateMailerEtherealConfigDTO from '@shared/container/providers/MailsProvider/dtos/ICreateMailerEtherealConfigDTO'

export default class EtherealConfig {

  private config:ICreateMailerEtherealConfigDTO
  transporter: Transporter

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
}
