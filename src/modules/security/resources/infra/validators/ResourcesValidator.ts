import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";

class ResourcesValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      to: Yup.string().required(),
      icon: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new ResourcesValidator();
