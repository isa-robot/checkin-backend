import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity("sms")
class Sms {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  zenviaSecretKey: string;

  @Column()
  chanel: string;

  @Column()
  from: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Sms;
