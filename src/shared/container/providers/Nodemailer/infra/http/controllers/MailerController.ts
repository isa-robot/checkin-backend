import { Response, Request} from 'express'
import EtherealConfig from "@shared/container/providers/Nodemailer/config/EtherealConfig";
import mailerConfigFactory from "@shared/container/providers/Nodemailer/factory/mailerConfigFactory";
import isValidSmtpOrSes from "@shared/container/providers/Nodemailer/infra/http/mailTest/testSmtpOrSes";

class MailerController {

  public async createOrUpdate(req: Request, res: Response){
    try{
      const {type} = req.body
      if(type == "ethereal") {
        const {host, port, user, pass, from, subject} = req.body
        const mailerConf = mailerConfigFactory('ethereal', {host, port, user, pass, from, subject})
        //@ts-ignore
        await mailerConf.transporter.verify((error, success) => {
          if (error)
            //TODO error message
            return res.status(501).json(error)
          else
            //TODO implements comunication with database
            return res.status(200).json(success)
        })
      }else if(type == "ses"){
        console.info("pass")
      }
    }catch(e){
      return res.json()
    }
  }
}
export default new MailerController()
