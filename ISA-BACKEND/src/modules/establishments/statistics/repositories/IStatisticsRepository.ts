import Statistic from "../infra/typeorm/entities/Statistic";
import ICreateStatisticDTO from "../dtos/ICreateStatisticDTO";

export default interface IStatisticsRepository {
  create(data: ICreateStatisticDTO): Promise<Statistic>;
  findById(id: string): Promise<Statistic | undefined>;
  findAll(): Promise<Statistic[]>;
  findByEstablishmentByTypeByDate(
    establishmentId: string,
    statisticTypeId: string,
    date: Date
  ): Promise<Statistic | undefined>;
  save(statistic: Statistic): Promise<Statistic>;
}
