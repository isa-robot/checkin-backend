import {GenreEnum, GradeEnum} from "@users/studentBaselines/enums/enums";

export default interface ICreateStudentBaselineDTO {
  age: number;
  genre: GenreEnum;
  grade: GradeEnum;
  userId: string;
}
