import {Request, Response} from 'express'
import IUserTerms from "@users/userTerms/Interfaces/UserTerms/IUserTerms";
import UserTermsService from '@users/userTerms/Services/UserTermsService'
import {container} from "tsyringe";

class UserTermsController {

  async create(req: Request, res: Response) {
    try{
      //@ts-ignore
      const userId = req.user.id
      const userTermsService = container.resolve(UserTermsService)
      const userTerms = await userTermsService.create(req.body, userId)
      return res.status(200).json(userTerms)
    }catch(e) {
      if(e.name == 'QueryFailedError'){
        return res.status(400).json(e.message)
      }
      return res.status(e.statusCode ? e.statusCode : 500).json(e.message)
    }
  }

  async index(req: Request, res: Response) {
    try{
      const userTermsService = container.resolve(UserTermsService)
      const usersTerms = await userTermsService.index()
      res.status(200).json(usersTerms)
    }catch(e){
      res.status(e.statusCode ? e.statusCode : 500).json(e)
    }
  }

  async byUserId(req: Request, res: Response) {
    try{
      //@ts-ignore
      const userId = req.user.id
      const userTermsService = container.resolve(UserTermsService)
      const usersTerms = await userTermsService.byUserId(userId)
      return res.json(usersTerms)
    }catch(e){
      res.status(e.statusCode ? e.statusCode : 500).json(e)
    }
  }
}

export default new UserTermsController()
