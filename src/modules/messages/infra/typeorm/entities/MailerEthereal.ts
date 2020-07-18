import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity("mailer_ethereal")
class MailerEthereal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: string

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  user: string;

  @Column()
  pass: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  subject: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MailerEthereal;
