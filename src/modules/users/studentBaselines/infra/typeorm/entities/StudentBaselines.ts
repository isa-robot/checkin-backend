import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import {GenreEnum, GradeEnum} from "@users/studentBaselines/enums/enums";

@Entity("student_baselines")
class StudentBaselines {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int4")
  age: number;

  @Column("enum", { name: "genre", enum: GenreEnum })
  genre: GenreEnum;

  @Column("enum", { name: "grade", enum: GradeEnum })
  grade: GradeEnum;

  @Column()
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StudentBaselines;
