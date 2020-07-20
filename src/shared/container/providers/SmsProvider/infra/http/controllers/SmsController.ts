import {Request, Response} from 'express'
import ZenviaSmsProvider from "@shared/container/providers/SmsProvider/implementations/ZenviaSmsProvider";
import ISendSmsDTO from "@shared/container/providers/SmsProvider/dtos/ISendSmsDTO";
import {container} from "tsyringe";
import createMailerServiceFactory from "@shared/container/providers/MailsProvider/factory/createMailerServiceFactory";
import CreateSmsConfigService from "@shared/container/providers/SmsProvider/services/CreateSmsConfigService";
import ListSmsConfigService from "@shared/container/providers/SmsProvider/services/ListSmsConfigService";
import RemoveSmsConfigService from "@shared/container/providers/SmsProvider/services/RemoveSmsConfigService";
import getSmsConfig from "@shared/container/providers/SmsProvider/services/getSmsConfig";


class SmsController {

  async createOrUpdate(req: Request, res: Response){
    try{
      const {zenviaSecretKey, chanel, from} = req.body
      const zenvia = new ZenviaSmsProvider({zenviaSecretKey, from, chanel})
      await zenvia.sendSms({msg: "ok", to:{phone: "51996770792"}})
        .then(async ()=> {
          const createSmsConfigService = container.resolve(CreateSmsConfigService)
          await createSmsConfigService.execute({zenviaSecretKey, chanel, from})
            .then((sms)=> {
              getSmsConfig()
              res.json(sms)
            })
            .catch((error:Error)=> res.status(500).json(error))
        })
        .catch((error:Error)=> res.status(500).json(error))
    }catch(e){
      res.status(400).json(e)
    }
  }

  async getSms(req: Request, res: Response){
    try{
      const listSmsConfigService = container.resolve(ListSmsConfigService)
      const smsConfig = await listSmsConfigService.execute()
      return res.json(smsConfig)
    }catch(e){
      return res.status(400).json(e)
    }
  }
  async deleteSmsConfig(req: Request, res: Response){
    try{
      const removeSmsConfigService = container.resolve(RemoveSmsConfigService)
      const smsConfig = await removeSmsConfigService.execute()
      getSmsConfig()
      return res.json({removed: smsConfig})
    }catch(e){
      return res.json(e)
    }
  }

}

export default new SmsController()
