import { Response, Request} from 'express'

class MailerController {

  public async create(req: Request, res: Response): Promise<Response> {
    try{
      const {} = req.body
      return res.json()
    }catch(e){
      return res.json()
    }
  }
}
