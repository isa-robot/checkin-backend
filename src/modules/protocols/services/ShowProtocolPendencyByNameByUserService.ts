import { inject, injectable } from "tsyringe";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import protocolsByNameByProtocolIdFactory from "../factories/protocolsByNameFactory";
import DateHelper from "@shared/helpers/dateHelper";

interface Request {
  userId: string,
  protocolName: string
}
@injectable()
class ShowProtocolPendencyByNameByUserService {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute( data: Request ): Promise<any> {

    const protocolActive = await this.protocolRepository.findProtocolActiveByNameByUser( data.userId, data.protocolName);
    if(protocolActive) {

      const dateHelper = new DateHelper()
      const protocolRunningDates: any[] = []
      const protocolAnsweredDates: any[] = []

      const answeredProtocols = await protocolsByNameByProtocolIdFactory(data.protocolName, protocolActive.id)

      for await (const answeredProtocol of answeredProtocols) {
        protocolAnsweredDates.push(
          dateHelper.dateToStringBR(answeredProtocol.protocolGenerationDate)
        )
      }

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getUTCDate())

      for (const i = protocolActive.created_at; i < tomorrow; i.setDate(i.getUTCDate() + 1)) {
        protocolRunningDates.push(dateHelper.dateToStringBR(i))
      }

      const protocolPendentDates = protocolRunningDates.filter(protocolRunningDate => {
        return !protocolAnsweredDates.includes(protocolRunningDate)
      })

      return {
        protocolsPendent: protocolPendentDates,
        protocolsAnswered: protocolAnsweredDates
      }
    }
  }
}

export default ShowProtocolPendencyByNameByUserService;
