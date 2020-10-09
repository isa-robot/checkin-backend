import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("protocol_list")
class ProtocolName {
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
export default ProtocolName;
