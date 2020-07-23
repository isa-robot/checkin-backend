import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import GenreEnum from "@users/baselines/enums/GenreEnum";
import RaceEnum from "@users/baselines/enums/RaceEnum";
import User from "@users/infra/typeorm/entities/User";

@Entity("baselines")
class Baseline {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int4")
  age: number;

  @Column("enum", { name: "genre", enum: GenreEnum })
  genre: GenreEnum;

  @Column("enum", { name: "race", enum: RaceEnum })
  race: RaceEnum;

  @Column("numeric")
  weight: number;

  @Column("numeric")
  height: number;

  @Column()
  city: string;

  @Column("boolean")
  recent_appointments: boolean;

  @Column("boolean")
  contact_covid19: boolean;

  @Column("boolean")
  mask: boolean;

  @Column()
  occupation: string;

  @Column()
  occupation_local: string;

  @Column("boolean")
  hypertension: boolean;

  @Column("boolean")
  diabetes: boolean;

  @Column("boolean")
  heart_disease: boolean;

  @Column("boolean")
  lung_disease: boolean;

  @Column("boolean")
  asthma: boolean;

  @Column("boolean")
  smoking: boolean;

  @Column("boolean")
  kidney_disease: boolean;

  @Column("boolean")
  cancer: boolean;

  @Column("boolean")
  corticosteroids_or_methotrexate: boolean;

  @Column("boolean")
  gestation: boolean;

  @Column()
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Baseline;
