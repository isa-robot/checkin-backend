import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity("mailerEthereal")
class MailerEthereal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: "ethereal"

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  user: string;

  @Column()
  pass: string;

  @Column()
  from: string;

  @Column()
  subject: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MailerEthereal;
