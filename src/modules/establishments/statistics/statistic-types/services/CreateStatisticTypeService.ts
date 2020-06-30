import { inject, injectable } from "tsyringe";
import IStatisticTypesRepository from "../repositories/IStatisticTypesRepository";
import ICreateStatisticTypeDTO from "../dtos/ICreateStatisticTypeDTO";
import StatisticType from "../infra/typeorm/entities/StatisticType";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateStatisticTypeService {
  constructor(
    @inject("StatisticTypesRepository")
    private statisticTypesRepository: IStatisticTypesRepository
  ) { }

  public async execute({
    name,
  }: ICreateStatisticTypeDTO): Promise<StatisticType> {
    const checkNameUsed = await this.statisticTypesRepository.findByName(name);

    if (checkNameUsed) {
      throw new AppError("Nome já utilizado", 400);
    }

    const statisticType = await this.statisticTypesRepository.create({
      name,
    });

    return statisticType;
  }
}

export default CreateStatisticTypeService;
