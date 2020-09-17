import { inject, injectable } from "tsyringe";
import IDiariesRepository from "../repositories/IDiariesRepository";
import Diary from "../infra/typeorm/entities/Diary";

@injectable()
class ShowLastDiaryByUserService {
  constructor(
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository
  ) { }

  public async execute(userId: string): Promise<Diary | any> {
    const diary = await this.diariesRepository.findLastByUser(userId);

    return {diary};
  }
}

export default ShowLastDiaryByUserService;
