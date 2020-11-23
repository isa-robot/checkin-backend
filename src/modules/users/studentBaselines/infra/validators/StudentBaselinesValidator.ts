import * as Yup from "yup";
import {NextFunction, Request, Response} from "express";
import {GradeEnum} from "@users/studentBaselines/enums/enums";

class StudentBaselinesValidator {
  async create(request: Request, response: Response, next: NextFunction){
    const schema = Yup.object().shape({
      age: Yup.number().integer().required(),
      genre: Yup.mixed().oneOf(["M", "F"]).required(),
      grade: Yup.mixed().oneOf([
        GradeEnum.FISRT,
        GradeEnum.SECOND,
        GradeEnum.THIRD,
        GradeEnum.FOURTH,
        GradeEnum.FIFTH,
        GradeEnum.SIXTH,
        GradeEnum.EIGHTH,
        GradeEnum.FIRSTYEAR,
        GradeEnum.SECONDYEAR,
        GradeEnum.THIRDYEAR
      ]).required()
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new StudentBaselinesValidator();
