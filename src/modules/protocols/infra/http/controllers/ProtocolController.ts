import {Request, Response} from 'express'
import {container} from "tsyringe";
import ShowProtocolPendencyByNameByUserService from "@protocols/services/ShowProtocolPendencyByNameByUserService";
import ShowProtocolActiveByNameByUser from "@protocols/services/ShowProtocolActiveByNameByUser";

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
  public async indexProtocolActiveByNameByUser(req: Request, res: Response) {
    const {
      protocolName
    } = req.params
    // @ts-ignore
    const userId = req.user.id
    const findProtocolActiveByNameByUser = container.resolve(ShowProtocolActiveByNameByUser)
    const protocolActive = await findProtocolActiveByNameByUser.execute({protocolName, userId})

    res.status(200).json(protocolActive);
  }
}

export default new ProtocolController()
