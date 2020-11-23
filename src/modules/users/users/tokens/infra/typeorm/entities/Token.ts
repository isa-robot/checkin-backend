import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  Generated,
} from "typeorm";
import User from "@users/users/infra/typeorm/entities/User";

@Entity("tokens")
class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  userId: string;

  @ManyToOne((type) => User, (user) => user.tokens)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Token;
