import { inject, injectable } from "tsyringe";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import protocolsByNameByProtocolIdFactory from "../factories/protocolsByNameFactory";
import DateHelper from "@shared/helpers/dateHelper";

interface Request {
  userId: string,
  protocolName: string
}
@injectable()
class ShowProtocolMailDateByNameByUserService {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute( data: Request ): Promise<any> {

    const protocolActive = await this.protocolRepository.findProtocolActiveByNameByUser( data.userId, data.protocolName);
    if(protocolActive) {

      const dateHelper = new DateHelper()
      const protocolRunningDates: any[] = []
      for (const i = protocolActive.created_at; i < protocolActive.protocolEndDate; i.setDate(i.getUTCDate() + 1)) {
        protocolRunningDates.push(dateHelper.dateToStringBR(i))
      }

      return {
        protocolMailDate: [
          protocolRunningDates[0],
          protocolRunningDates[5],
          protocolRunningDates[10]
        ]
      }
    }
  }
}

export default ShowProtocolMailDateByNameByUserService;
