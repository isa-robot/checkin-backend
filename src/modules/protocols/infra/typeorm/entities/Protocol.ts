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
  diary: Diary

  @Column()
  userId: string

  @Column()
  protocolName: string

  @Column()
  protocolEndDate: Date

  @Column()
  active: boolean

  @CreateDateColumn({ type: 'timestamp', precision: 3, default: () => `timezone('utc', now())`, readonly: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3, default: () => `timezone('utc', now())`, readonly: true })
  updated_at: Date;
}
export default Protocol;
