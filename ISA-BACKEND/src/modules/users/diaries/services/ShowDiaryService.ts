import { inject, injectable } from "tsyringe";
import IDiariesRepository from "../repositories/IDiariesRepository";
import Diary from "../infra/typeorm/entities/Diary";
import AppError from "@shared/errors/AppError";

@injectable()
class ShowDiaryService {
  constructor(
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository
  ) { }

  public async execute(id: string): Promise<Diary> {
    const diary = await this.diariesRepository.findById(id);

    if (!diary) {
      throw new AppError("Diário não encontrado", 404);
    }

    return diary;
  }
}

export default ShowDiaryService;
