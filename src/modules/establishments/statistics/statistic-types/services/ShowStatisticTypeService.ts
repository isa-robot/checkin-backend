import { inject, injectable } from "tsyringe";
import IStatisticTypesRepository from "../repositories/IStatisticTypesRepository";
import StatisticType from "../infra/typeorm/entities/StatisticType";
import AppError from "@shared/errors/AppError";

@injectable()
class ShowStatisticTypeService {
  constructor(
    @inject("StatisticTypesRepository")
    private statisticTypesRepository: IStatisticTypesRepository
  ) { }

  public async execute(id: string): Promise<StatisticType> {
    const statisticType = await this.statisticTypesRepository.findById(id);

    if (!statisticType) {
      throw new AppError("Tipo de Estatística não encontrada", 404);
    }

    return statisticType;
  }
}

export default ShowStatisticTypeService;
