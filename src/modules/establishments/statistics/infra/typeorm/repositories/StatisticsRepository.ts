import { getRepository, Repository, Between } from "typeorm";
import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import Statistic from "../entities/Statistic";
import ICreateStatisticDTO from "@establishments/statistics/dtos/ICreateStatisticDTO";
import { addHours } from "date-fns";

class StatisticsRepository implements IStatisticsRepository {
  private ormRepository: Repository<Statistic>;

  constructor() {
    this.ormRepository = getRepository(Statistic);
  }

  public async create(data: ICreateStatisticDTO): Promise<Statistic> {
    const statistic = this.ormRepository.create(data);

    await this.ormRepository.save(statistic);

    return statistic;
  }

  public async findAll(): Promise<Statistic[]> {
    const statistics = await this.ormRepository.find();

    return statistics;
  }

  public async findByEstablishmentByTypeByDate(
    establishmentId: string,
    statisticTypeId: string,
    date: Date
  ): Promise<Statistic | undefined> {
    const endDate = addHours(date, 23);
    const statistic = await this.ormRepository.findOne({
      establishmentId,
      statisticTypeId,
      created_at: Between(date, endDate),
    });

    return statistic;
  }

  public async findById(id: string): Promise<Statistic | undefined> {
    const statistic = await this.ormRepository.findOne({
      where: { id },
      relations: ["statisticType"],
    });

    return statistic;
  }

  public async save(statistic: Statistic): Promise<Statistic> {
    return await this.ormRepository.save(statistic);
  }
}

export default StatisticsRepository;
