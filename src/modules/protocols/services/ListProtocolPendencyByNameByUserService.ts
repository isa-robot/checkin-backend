import { inject, injectable } from "tsyringe";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import ListProtocolByNameByProtocolId from "../factories/ListProtocolByNameFactory";

interface Request {
  userId: string,
  protocolName: string
}
@injectable()
class ListProtocolPendencyByNameByUserService {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute( data: Request ): Promise<any> {

    const protocolActive = await this.protocolRepository.findProtocolActiveByNameByUser( data.userId, data.protocolName );
    //@ts-ignore

    if(protocolActive){

      var protocolDate: any[] = []

      const answeredProtocols = await ListProtocolByNameByProtocolId(data.protocolName, protocolActive.id)
      for (const i = protocolActive.created_at; i <= protocolActive?.protocolEndDate; i.setDate(i.getDate() + 1)) {
        protocolDate.push(i.getDate() + "/" + (i.getMonth() + 1) + "/" + i.getFullYear())
      }

    }
    return protocolActive;
  }
}

export default ListProtocolPendencyByNameByUserService;
