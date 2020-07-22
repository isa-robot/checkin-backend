import { Response, Request } from "express";
import { container } from "tsyringe";
import CreateStatisticService from "@establishments/statistics/services/CreateStatisticService";
import ShowStatisticService from "@establishments/statistics/services/ShowStatisticService";
import ListStatisticsService from "@establishments/statistics/services/ListStatisticsService";

class StatisticsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value, establishmentId, statisticTypeId } = request.body;

    const createStatisticService = container.resolve(CreateStatisticService);

    const statistic = await createStatisticService.execute({
      value,
      establishmentId,
      statisticTypeId,
    });

    return response.status(201).json(statistic);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStatisticService = container.resolve(ShowStatisticService);

    const statistic = await showStatisticService.execute(id);

    return response.status(200).json(statistic);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listStatisticsService = container.resolve(ListStatisticsService);

    const statistic = await listStatisticsService.execute();

    return response.status(200).json(statistic);
  }
}

export default new StatisticsController();
