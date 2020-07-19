import path from 'path'
//@ts-ignore
import sesTransport from 'nodemailer-ses-transport'
import nodemailer, {Transporter} from 'nodemailer'
//@ts-ignore
import hbs from 'nodemailer-express-handlebars'
import aws from 'aws-sdk'
import ICreateMailerSesConfigDTO from "@shared/container/providers/MailsProvider/dtos/IMailerSesConfigDTO";

export default class SesConfig {

  private config:ICreateMailerSesConfigDTO
  transporter: Transporter

  constructor(dataConfig: ICreateMailerSesConfigDTO) {
    this.config = dataConfig
    this.createTransport()
  }

  private createTransport(){
    this.transporter = nodemailer.createTransport({
      SES: new aws.SES({
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
        region: this.config.region})
    })
  }
}
