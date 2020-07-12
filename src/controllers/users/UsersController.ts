import {Request, Response} from "express";
class UsersController {

  public async getUsers(req: Request, res: Response){
    res.send("hello user")
  }
}
export default new UsersController()
