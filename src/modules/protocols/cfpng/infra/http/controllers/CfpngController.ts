import {Request, Response} from 'express'
import {container} from "tsyringe";
import CreateCfpngService from "@protocols/cfpng/services/CreateCfpngService";
import ListEstablishmentsService from "@establishments/services/ListEstablishmentsService";
import ShowLastCfpngByUserService from "@protocols/cfpng/services/ShowLastCfpngByUserService";
import ShowCfpngService from "@protocols/cfpng/services/ShowCfpngService";
import ShowCfpngByDateByUserService from "@protocols/cfpng/services/ShowCfpngByDateByUserService";

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
          newSymptom,
          protocolDate
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
          newSymptom,
          protocolDate
        }, userId, establishment[0])

        return res.status(200).json(cfpng)
      }catch(e){
        return res.status(500).json(e)
      }
    }

    public async show(req: Request, res: Response) {
      const {userId} = req.params
      const showCfpng = container.resolve(ShowCfpngService)
      const cfpng = await showCfpng.execute(userId)

      return res.status(200).json(cfpng)
    }

    public async showLastByUser(req: Request, res: Response) : Promise<Response> {
      //@ts-ignore
      const userId = request.user.id
      const showLastCfpngByUser = container.resolve(ShowLastCfpngByUserService);
      const cfpng = await showLastCfpngByUser.execute(userId)

      return res.status(200).json(cfpng)
    }

  public async showByDate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { date } = request.params;

    // @ts-ignore
    const  id  = request.user.id;
    const showCfpngByDateByUserService = container.resolve(
      ShowCfpngByDateByUserService
    );

    const cfpng = await showCfpngByDateByUserService.execute(date, id);

    return response.status(200).json(cfpng);
  }

}
export default new CfpngController();

