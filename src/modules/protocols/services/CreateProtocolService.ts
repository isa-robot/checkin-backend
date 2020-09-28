import { inject, injectable, container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";

interface Request {
  diaryId: Diary
}

@injectable()
class CreateCfpngService {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository,
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository,
  ) { }

  public async execute(
    data: Request,
    userId: string,
  ): Promise<Object> {

    const diary = await this.diariesRepository.findLastByUser(userId);

    if(!diary){
      throw new AppError("Diario não encontrado", 404)
    }

    const lastProtocol = await this.protocolRepository.findLastProtocolByUser(userId);

    if( lastProtocol ) {
      const lastDate = lastProtocol.created_at
      const diffDate = new Date().getDate() - lastDate.getDate()
      if(diffDate <= 14) {
        throw new AppError("há um protocolo em andamento", 409)
      }
    }

    const finalDate = new Date()
    finalDate.setDate(new Date().getDate() + 13)

    const protocol = await this.protocolRepository.create({
      diaryId: data.diaryId,
      userId: userId,
      finalDate: finalDate
    });
    return {protocol};
  }
}

export default CreateCfpngService;
