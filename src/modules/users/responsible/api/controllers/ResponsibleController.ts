import {Request, Response} from "express";
import { autoInjectable, inject } from "tsyringe";
import ResponsibleService from "@users/responsible/service/ResponsibleService";
import IResponsibleService from "@users/responsible/service/IResponsibleService";
import IResponsible from "@users/responsible/interfaces/IResponsible";

@autoInjectable()
class ResponsibleController {
  constructor(
    @inject(ResponsibleService)
    private service?: IResponsibleService,
  ) { }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const responsible: IResponsible = req.body;
      // @ts-ignore
      const user = req.user;
      const result = await this.service?.create(responsible, user.id);
      return res.json(result);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}
export default new ResponsibleController();
