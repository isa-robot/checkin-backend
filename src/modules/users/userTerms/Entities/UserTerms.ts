import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("user_terms")
class UserTerms {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  personalKidDataTerm: boolean;

  @Column()
  responsabilityTerm: boolean;

  @Column()
  canUseTheSystem: boolean;

  @Column()
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserTerms;
