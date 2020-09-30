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

@Entity("protocol")
class Protocol {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(type => Diary)
  @JoinColumn()
  diary: Diary

  @Column()
  userId: string

  @Column()
  protocolName: string

  @Column()
  protocolEndDate: Date

  @Column()
  active: boolean

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Protocol;
