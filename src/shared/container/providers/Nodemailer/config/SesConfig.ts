import path from 'path'
//@ts-ignore
import sesTransport from 'nodemailer-ses-transport'
import nodemailer, {Transporter} from 'nodemailer'
//@ts-ignore
import hbs from 'nodemailer-express-handlebars'
import ICreateMailerSesConfigDTO from "@shared/container/providers/Nodemailer/dtos/ICreateMailerSesConfigDTO";

export default class SesConfig {

  private config:ICreateMailerSesConfigDTO
  transporter: Transporter

  constructor(dataConfig: ICreateMailerSesConfigDTO) {
    this.config = dataConfig
    this.createTransport()
  }

  private createTransport(){
    this.transporter = nodemailer.createTransport(sesTransport({
      accessKeyId: this.config.accessKeyId,
      secretAccessKey: this.config.secretAccessKey
    }))
  }

  public async sendMail(to:string){
    // this.transporter.use('compile', hbs())

    await this.transporter.sendMail({
      from: this.config.from,
      to: to,
      subject: this.config.subject,
      text: "algo aqui"
    }, (error:any, info:any) => {
      if(error)
        throw new Error("something went wrong")
      console.info('Message sent: ' + info)
    })
  }
}
