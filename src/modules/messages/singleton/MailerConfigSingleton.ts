import {Transporter} from "nodemailer";

class MailerConfigSingleton {
  transporter: Transporter
  config: any
  constructor() {
  }

  public sendMail(to:string){
    // this.transporter.use('compile', hbs())
    this.transporter.sendMail({
      from: {
        name: this.config.name,
        address: this.config.address
      },
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
export default new MailerConfigSingleton()
