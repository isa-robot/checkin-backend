import { inject, injectable, container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
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
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository,
  ) { }

  public async execute(
    data: Request,
  ) {

    const protocolByType = await this.protocolRepository.findProtocolActiveByNameByUser(data.userId, data.protocol.protocolName)

    const finalDate = new Date()
    finalDate.setDate(new Date().getDate() + data.protocol.period)

    if(!protocolByType) {
      const protocol = await this.protocolRepository.create({
        diary: data.diary,
        userId: data.userId,
        finalDate: finalDate,
        protocolName: data.protocol.protocolName,
        active: true
      });
    }
  }
}

export default CreateProtocolByTypeService;
