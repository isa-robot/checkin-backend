import { Response, Request} from 'express'
import EtherealConfig from "@nodemailer/config/EtherealConfig";
import mailerConfigFactory from "@nodemailer/factory/mailerConfigFactory";
import {container} from "tsyringe";
import CreateMailerEtherealService from "@nodemailer/services/CreateMailerEtherealService";
import CreateMailerSesService from "@nodemailer/services/CreateMailerSesService";
import getMailerConfig from "@nodemailer/services/getMailerConfig";

class MailerController {
  public async createOrUpdate(req: Request, res: Response){
    try{
      const {type} = req.body
      if(type == "ethereal") {
        const {host, port, user, pass, name, address, subject} = req.body
        const mailerEtherealConfig = mailerConfigFactory(type, {host, port, user, pass})
        //@ts-ignore
        await mailerEtherealConfig.transporter.verify(async (error, success) => {
          if (success) {
            const createMailerEtherealService = container.resolve(CreateMailerEtherealService)
            const mailerEthereal = await createMailerEtherealService.execute({host, port, user, pass, name, address, subject})
            await getMailerConfig()
            return res.status(200).json(mailerEthereal)
          }else {
            return res.status(501).json(error)
          }
        })
      }else if(type == "ses"){
        const {accessKeyId, secretAccessKey, name, address, subject, region} = req.body
        const mailerSesConfig = mailerConfigFactory(type, {accessKeyId, secretAccessKey, region})
        //@ts-ignore
        await mailerSesConfig.transporter.verify(async (error, success) => {
          if(success){
            const createMailerSesService = container.resolve(CreateMailerSesService)
            const mailerSes = await createMailerSesService.execute({accessKeyId, secretAccessKey, name, address, subject, region})
            await getMailerConfig()
            return res.status(200).json(mailerSes)
          }else {
            return res.status(501).json(error)
          }
        })
      }else{
        return res.status(500).json("type doesnt exists")
      }
    }catch(e){
      return res.json()
    }
  }

}
export default new MailerController()
