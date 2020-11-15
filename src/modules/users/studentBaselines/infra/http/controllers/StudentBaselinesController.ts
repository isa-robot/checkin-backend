import { Response, Request } from "express";
import { container } from "tsyringe";

import CreateStudentBaseline from "@users/studentBaselines/services/CreateStudentBaseline";
import ShowStudentBaseline from "@users/studentBaselines/services/ShowStudentBaseline";

class BaselineController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      age,
      genre,
      grade
    } = req.body;

    // @ts-ignore
    const userId = req.kauth.grant.access_token.content.sub

    const createBaselineService = container.resolve(CreateStudentBaseline);

    const baseline = await createBaselineService.execute({
      userId,
      age,
      genre,
      grade
    });

    return res.status(201).json(baseline);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBaselineService = container.resolve(ShowStudentBaseline);

    const baseline = await showBaselineService.execute(id);

    return response.status(200).json(baseline);
  }
}

export default new BaselineController();
