import {Request, Response} from "express";
import {container} from "tsyringe";
import CreateMailerDestinatariesService
  from "@shared/container/providers/MailsProvider/services/CreateMailerDestinatariesService";
import ListDestinatariesService from "@shared/container/providers/MailsProvider/services/ListDestinatariesService";
import RemoveMailerDestinatariesService
  from "@shared/container/providers/MailsProvider/services/RemoveMailerDestinatary";
import getMailerDestinataries from "@shared/container/providers/MailsProvider/services/getMailerDestinataries";

class MailerDestinatariesController{

  async createOrUpdate(req:Request, res: Response){
    try{
      const mailerDestinatariesService = container.resolve(CreateMailerDestinatariesService)
      await mailerDestinatariesService.execute(req.body)
        .then((destinatary) => {
          getMailerDestinataries()
          res.status(200).json(destinatary)
        })
        .catch((error) => res.status(error.statusCode).json(error.message))
    }catch(e){
      return res.json(e)
    }
  }
  async getDestinataries(req: Request, res: Response){
    try{
      const mailerDestinatariesService = container.resolve(ListDestinatariesService)
      const mails = await mailerDestinatariesService.execute()
      return res.json(mails)
    }catch(e){
      return res.json(e)
    }
  }
  async removeDestinatary(req: Request, res: Response){
    try{
      const {id} = req.params
      const removeDestinataryService = container.resolve(RemoveMailerDestinatariesService)
      await removeDestinataryService.execute({id})
        .then((destinatary) => {
          getMailerDestinataries()
          res.json(destinatary)
        })
        .catch((error)=> res.status(error.statusCode).json(error.message))
    }catch(e){
      return res.json(e)
    }
  }
}
export default new MailerDestinatariesController()
