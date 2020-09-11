import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

class CfpngValidator {
  async create(request: Request, response: Response, next: NextFunction) {
    const schema = Yup.object().shape({
      breathLess: Yup.boolean().required(),
      breathDifficulty: Yup.boolean().required(),
      chestTightness: Yup.boolean().required(),
      breathPressure: Yup.boolean().required(),
      mentalConfusion: Yup.boolean().required(),
      dizziness: Yup.boolean().required(),
      draggedVoice: Yup.boolean().required(),
      awakeDifficulty: Yup.boolean().required(),
      blueSkin: Yup.boolean().required(),
      lowPressure: Yup.boolean().required(),
      pallor: Yup.boolean().required(),
      sweating: Yup.boolean().required(),
      oximetry: Yup.boolean().required(),
      extraSymptom: Yup.boolean().required(),
      newSymptom: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  }
}

export default new CfpngValidator();
