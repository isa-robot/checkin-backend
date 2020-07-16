import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity("mailerSes")
class MailerSes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  accessKeyId: string;

  @Column()
  secretAccessKey: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MailerSes;
