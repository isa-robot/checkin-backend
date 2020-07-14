import {Request, Response} from "express";

class UsersController {
  public async getUser(req: Request, res: Response){
    //@ts-ignore
    const username = req.kauth.grant.access_token.content
    res.json({username})
  }

}
export default new UsersController()
