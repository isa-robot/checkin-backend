import {Request, Response} from 'express'
import {container} from "tsyringe";
import CreateCfpngService from "@protocols/cfpng/services/CreateCfpngService";
import ListEstablishmentsService from "@establishments/services/ListEstablishmentsService";

class CfpngController {
    public async create(req: Request, res: Response): Promise<Response> {
      try{
        const {
          breathLess,
          breathDifficulty,
          chestTightness,
          breathPressure,
          mentalConfusion,
          dizziness,
          draggedVoice,
          awakeDifficulty,
          blueSkin,
          lowPressure,
          pallor,
          sweating,
          oximetry,
          extraSymptom,
          newSymptom
        } = req.body

        //@ts-ignore
        const userId = req.kauth.grant.access_token.content.sub;

        const establishmentService = container.resolve(ListEstablishmentsService);

        const establishment = await establishmentService.execute()

        const createCfpngService = container.resolve(CreateCfpngService)
        const cfpng = await createCfpngService.execute({
          breathLess,
          breathDifficulty,
          chestTightness,
          breathPressure,
          mentalConfusion,
          dizziness,
          draggedVoice,
          awakeDifficulty,
          blueSkin,
          lowPressure,
          pallor,
          sweating,
          oximetry,
          extraSymptom,
          newSymptom
        }, userId, establishment[0])
        return res.status(200).json(cfpng)
      }catch(e){
        return res.status(500).json(e)
      }
    }
}
export default new CfpngController();

