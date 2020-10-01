import { inject, injectable } from "tsyringe";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import protocolsByNameByProtocolIdFactory from "../factories/protocolsByNameFactory";
import UsersWithProtocolActiveSchedule from "@shared/infra/jobs/UsersWithProtocolActiveSchedule";

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

      const protocolRunningDates: any[] = []
      const protocolAnsweredDates: any[] = []

      const answeredProtocols = await protocolsByNameByProtocolIdFactory(data.protocolName, protocolActive.id)

      for await (const answeredProtocol of answeredProtocols) {
        protocolAnsweredDates.push(
          answeredProtocol.protocolGenerationDate.getDate() + "/" +
          (answeredProtocol.protocolGenerationDate.getMonth() + 1) + "/" +
          answeredProtocol.protocolGenerationDate.getFullYear()
        )
      }

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      for (const i = protocolActive.created_at; i <= tomorrow; i.setDate(i.getDate() + 1)) {
        protocolRunningDates.push(i.getDate() + "/" + (i.getMonth() + 1) + "/" + i.getFullYear())
      }

      const protocolPendentDates = protocolRunningDates.filter(protocolRunningDate => {
        return !protocolAnsweredDates.includes(protocolRunningDate)
      })

      UsersWithProtocolActiveSchedule()

      return {
        protocolsPendent: protocolPendentDates,
        protocolAnswered: protocolAnsweredDates
      }
    }
  }
}

export default ShowProtocolPendencyByNameByUserService;
