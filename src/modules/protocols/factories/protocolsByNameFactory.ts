import ListCfpngByProtocolIdService from '@protocols/cfpng/services/ListCfpngByProtocolIdService';
import {container} from "tsyringe";

const protocolsByNameByProtocolIdFactory = async (protocolName: string, protocolId: string) => {
  if(protocolName == "cfpng") {
    const listCfpngByProtocolIdService = container.resolve(ListCfpngByProtocolIdService)
    return await listCfpngByProtocolIdService.execute(protocolId)
  }
}

export default protocolsByNameByProtocolIdFactory
