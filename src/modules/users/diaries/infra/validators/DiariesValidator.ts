import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

class DiariesValidator {
    async create(request: Request, response: Response, next: NextFunction) {
        const schema = Yup.object().shape({
          smellLoss: Yup.boolean().required(),
          tasteLoss: Yup.boolean().required(),
          appetiteLoss: Yup.boolean().required(),
          fatigue: Yup.boolean().required(),
          fever: Yup.boolean().required(),
          cough: Yup.boolean().required(),
          diarrhea: Yup.boolean(),
          delirium: Yup.boolean().required(),
          soreThroat: Yup.boolean().required(),
          coryza: Yup.boolean().required(),
          shortnessOfBreath: Yup.boolean().required(),
          abdominalPain: Yup.boolean(),
          chestPain: Yup.boolean().required(),
        });

        await schema.validate(request.body, { abortEarly: false });

        return next();
    }
}

export default new DiariesValidator();
