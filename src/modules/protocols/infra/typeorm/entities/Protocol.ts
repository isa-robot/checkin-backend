import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";

@Entity("protocol")
class Protocol {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(type => Diary)
  @JoinColumn()
  diaryId: Diary

  @Column()
  protocolId: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Protocol;
