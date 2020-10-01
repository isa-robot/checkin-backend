import {Request, Response} from 'express'
import {container} from "tsyringe";
import ShowProtocolPendencyByNameByUserService from "@protocols/services/ShowProtocolPendencyByNameByUserService";

class ProtocolController {
  public async indexPendentAndAnsweredByProtocolName(req: Request, res: Response) {
    const {
      protocolName
    } = req.params
    // @ts-ignore
    const userId = req.user.id
    const listProtocolPendencyByNameByUser = container.resolve(ShowProtocolPendencyByNameByUserService)
    const protocolsPendent = await listProtocolPendencyByNameByUser.execute({userId, protocolName})

    res.status(200).json(protocolsPendent)
  }
}

export default new ProtocolController()
