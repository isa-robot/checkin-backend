import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity("mailer_destinataries")
class MailerDestinataries {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  destinatary_type: string

  @Column()
  name: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MailerDestinataries;
