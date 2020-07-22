import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import StatisticType from "@establishments/statistics/statistic-types/infra/typeorm/entities/StatisticType";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";

@Entity("statistics")
class Statistic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("numeric")
  value: number;

  @Column("uuid")
  statisticTypeId: string;

  @Column("uuid")
  establishmentId: string;

  @ManyToOne((type) => StatisticType, (statisticType) => statisticType.statistics)
  statisticType: StatisticType;

  @ManyToOne(
    (type) => Establishment,
    (establishment) => establishment.statistics
  )
  establishment: Establishment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Statistic;
