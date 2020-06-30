import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";

class StatisticsValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      statisticTypeId: Yup.string().required(),
      establishmentId: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new StatisticsValidator();
