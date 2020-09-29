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

@Entity("ProtocolList")
class ProtocolList {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  protocolName: string;

  @Column()
  period: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default ProtocolList;
