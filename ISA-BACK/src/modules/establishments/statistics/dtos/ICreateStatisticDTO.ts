import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import StatisticType from "../statistic-types/infra/typeorm/entities/StatisticType";

export default interface ICreateStatisticDTO {
  value: number;
  establishment: Establishment;
  statisticType: StatisticType;
}
