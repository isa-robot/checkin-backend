import { Response, Request } from "express";
import KeycloakAdmin from '@shared/keycloak/keycloak-admin'

class UsersController {

  async index(req:Request, res:Response){
    try{
      const users = await KeycloakAdmin.usersListComplete()
      const usersWithRoles = await Promise.all(
        users.map((user:any)=>
          KeycloakAdmin.getRoleFromUser(user.id)
            .then((roles:any)=> {
              return {roles, user}
            }))
        )
      return res.status(200).json(usersWithRoles)
    }catch(e){
      return res.json(e)
    }
  }

  async getUserById(req: Request, res: Response){
   try{
     const {id} = req.params
     const user = await KeycloakAdmin.getUserById(id)
     const roles = await KeycloakAdmin.getRoleFromUser(user.id)
     return res.status(200).json({user, roles})
   }catch(e){
     return res.json(e)
   }
  }

  async countUsers(req: Request, res: Response) {
    try{
      const usersNumber = await KeycloakAdmin.countUsers()
      return res.json(usersNumber)
    }catch(e) {
      return res.json(e)
    }
  }

  async getUsersPaginated(req: Request, res: Response) {
    try{
      const {page} = req.params
      const users = await KeycloakAdmin.usersList(page)
      const usersWithRoles = await Promise.all(
        users.map((user:any) =>
          KeycloakAdmin.getRoleFromUser(user.id)
            .then((roles:any) => {
              return {roles, user}
            })
        )
      )
      return res.status(200).json(usersWithRoles)
    }catch(e){
      return res.json(e)
    }
  }

  async getUserByName(req: Request, res: Response){
   try{
     const {
       username,
       page} = req.params
     const users = await KeycloakAdmin.usersByUsername(username, page)
     const usersWithRoles = await Promise.all(
       users.map((user:any)=>
         KeycloakAdmin.getRoleFromUser(user.id)
           .then((roles:any)=> {
             return {roles, user}
           }))
     )
     return res.status(200).json(usersWithRoles)
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
  async usersFromRole(req:Request, res: Response){
    try{
      const{roleName} = req.body
      const users = await KeycloakAdmin.getUsersFromRole(roleName)
      return res.json(users)
    }catch(e){
      return res.json(e)
    }
  }
}

export default new UsersController();
