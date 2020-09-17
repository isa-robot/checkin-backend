import { inject, injectable } from "tsyringe";
import ICfpngRepository from "../repositories/ICfpngRepository";
import Cfpng from "../infra/typeorm/entities/Cfpng";

@injectable()
class ShowLastDiaryByUserService {
  constructor(
    @inject("CfpngRepository")
    private CfpngRepository: ICfpngRepository,
  ) { }

  public async execute(userId: string): Promise<Cfpng | any> {
    const cfpng = await this.CfpngRepository.findLastByUser(userId);

    return {cfpng};
  }
}

export default ShowLastDiaryByUserService;
