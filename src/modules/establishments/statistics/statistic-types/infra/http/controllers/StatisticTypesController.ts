import { Response, Request } from "express";
import { container } from "tsyringe";
import CreateStatisticTypeService from "@establishments/statistics/statistic-types/services/CreateStatisticTypeService";
import ListStatisticTypesService from "@establishments/statistics/statistic-types/services/ListStatisticTypesService";
import ShowStatisticTypeService from "@establishments/statistics/statistic-types/services/ShowStatisticTypeService";

class StatisticTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createStatisticTypeService = container.resolve(
      CreateStatisticTypeService
    );

    const statisticType = await createStatisticTypeService.execute({
      name,
    });

    return response.status(201).json(statisticType);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStatisticTypeService = container.resolve(
      ShowStatisticTypeService
    );

    const statisticType = await showStatisticTypeService.execute(id);

    return response.status(200).json(statisticType);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listStatisticTypesService = container.resolve(
      ListStatisticTypesService
    );

    const statisticTypes = await listStatisticTypesService.execute();

    return response.status(200).json(statisticTypes);
  }
}

export default new StatisticTypesController();
