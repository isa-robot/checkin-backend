import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import Statistic from "@establishments/statistics/infra/typeorm/entities/Statistic";

@Entity("statistic_types")
class StatisticType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => Statistic, (statistic) => statistic.statisticType)
  statistics: Statistic;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StatisticType;
