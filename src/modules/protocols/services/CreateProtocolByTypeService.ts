import { inject, injectable, container } from "tsyringe";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import protocolName from "@protocols/dtos/IProtocolList";

interface Request {
  diary: Diary,
  userId: string,
  protocol: protocolName
}

@injectable()
class CreateProtocolByTypeService {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository,
  ) { }

  public async execute(
    data: Request,
  ) {

    const protocolByType = await this.protocolRepository.findProtocolActiveByNameByUser(data.userId, data.protocol.protocolName)

    const protocolEndDate = new Date()
    protocolEndDate.setDate(new Date().getDate() + data.protocol.period)

    if(!protocolByType) {
      const protocol = await this.protocolRepository.create({
        diary: data.diary,
        userId: data.userId,
        protocolEndDate: protocolEndDate,
        protocolName: data.protocol.protocolName,
        active: true
      });
      console.info(protocol)
    }
  }
}

export default CreateProtocolByTypeService;
