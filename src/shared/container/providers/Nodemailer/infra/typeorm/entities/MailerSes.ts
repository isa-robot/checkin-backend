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
  type: "ses"

  @Column()
  accessKeyId: string;

  @Column()
  secretAccessKey: string;

  @Column()
  from: string;

  @Column()
  subject: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MailerSes;
