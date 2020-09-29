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
import {bool} from "aws-sdk/clients/signer";

@Entity("Protocol")
class Protocol {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(type => Diary)
  @JoinColumn()
  diaryId: Diary

  @Column()
  userId: string

  @Column()
  finalDate: Date

  @Column()
  active: boolean

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Protocol;
