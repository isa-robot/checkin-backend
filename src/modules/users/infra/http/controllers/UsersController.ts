import { Response, Request } from "express";
import KeycloakAdmin from '@shared/keycloak/keycloak-admin'

class UsersController {

  async index(req:Request, res:Response){
    try{
      const users = await KeycloakAdmin.usersList()
      return res.status(200).json(users)
    }catch(e){
      return res.json(e)
    }
  }

  async getUserById(req: Request, res: Response){
   try{
     const {id} = req.params
     const user = await KeycloakAdmin.getUserById(id)
     return res.status(200).json(user)
   }catch(e){
     return res.json(e)
   }
  }
  async getUserByName(req: Request, res: Response){
   try{
     const {username} = req.body
     const user = await KeycloakAdmin.getUserByName(username)
     return res.status(200).json(user)
   }catch(e){
     return res.json(e)
   }
  }
  async indexRoles(req:Request, res: Response) {
    try{
      const roles = await KeycloakAdmin.getRoles()
      return res.status(200).json(roles)
    }catch(e){
      return res.json(e)
    }
  }
  async addRoleForUser(req:Request, res:Response){
    try{
      const {id, roleName} = req.body
      await KeycloakAdmin.addRoleForUser(id, roleName)
      return res.status(200).json()
    }catch(e){
      return res.json(e)
    }
  }
  async removeRoleFromUser(req:Request, res:Response) {
    try{
      const{id, roleName} = req.body
      await KeycloakAdmin.removeRoleFromUser(id, roleName)
      return res.status(200).json()
    }catch(e){
      return res.json(e)
    }
  }
}

export default new UsersController();
