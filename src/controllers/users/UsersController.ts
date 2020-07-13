import {Request, Response} from "express";
class UsersController {

  public async getUsers(req: Request, res: Response){
    //@ts-ignore
    const token = req.kauth.grant.access_token.content;
    console.info(token)
    res.send("hello user")
  }
}
export default new UsersController()
