import {
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import User from "@users/infra/typeorm/entities/User";
import Statistic from "@establishments/statistics/infra/typeorm/entities/Statistic";

@Entity("establishments")
class Establishment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column("boolean")
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  users: string[];

  @OneToMany((type) => Statistic, (statistic) => statistic.establishment)
  statistics: Statistic[];
}

export default Establishment;
