import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";
import ICustomBaseEntity from "./ICustomBaseEntity";

export default class CustomBaseEntity extends BaseEntity implements ICustomBaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id = 0;

  @CreateDateColumn({name: "created_at", default: new Date()})
  createdAt: Date = new Date();

  @UpdateDateColumn({name: "updated_at", default: new Date()})
  updatedAt: Date = new Date();
}
