import { inject, injectable, container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import ProtocolType from "@protocols/dtos/IProtocolList";

interface Request {
  diaryId: Diary,
  userId: string,
  protocolType: ProtocolType
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
  ): Promise<Object> {

    const protocolByType = await this.protocolRepository.findProtocolActiveByNameByUser(data.userId, data.protocolType.protocolName)

    const finalDate = new Date()
    finalDate.setDate(new Date().getDate() + data.protocolType.period)

    if(!protocolByType) {
      const protocol = await this.protocolRepository.create({
        diaryId: data.diaryId,
        userId: data.userId,
        finalDate: finalDate,
        active: true
      });
      return {protocol}
    } else {
      return { protocol: "protocolo em andamento" };
    }
  }
}

export default CreateProtocolByTypeService;
