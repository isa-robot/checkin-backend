import {Request, Response} from 'express'
import {container} from "tsyringe";
import ShowProtocolPendencyByNameByUserService from "@protocols/services/ShowProtocolPendencyByNameByUserService";
import ShowProtocolActiveByNameByUser from "@protocols/services/ShowProtocolActiveByNameByUser";
import ShowProtocolMailDateByNameByUserService from "@protocols/services/ShowProtocolMailDateByNameByUserService";
import ShowProtocolsActiveByUser from "@protocols/services/ShowProtocolsActiveByUser";

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
  public async indexProtocolActiveByUser(req: Request, res: Response) {
    // @ts-ignore
    const userId = req.user.id
    const findProtocolActiveByUser = container.resolve(ShowProtocolsActiveByUser)
    const protocolActive = await findProtocolActiveByUser.execute({userId})

    res.status(200).json(protocolActive);
  }

  public async indexProtocolMailDateByNameByUser(req: Request, res: Response) {
    const {
      protocolName
    } = req.params
    // @ts-ignore
    const userId = req.user.id
    const showProtocolMailDateByNameByUserService = container.resolve(ShowProtocolMailDateByNameByUserService)
    const protocolDate = await showProtocolMailDateByNameByUserService.execute({protocolName, userId})

    res.status(200).json(protocolDate);
  }
}

export default new ProtocolController()
