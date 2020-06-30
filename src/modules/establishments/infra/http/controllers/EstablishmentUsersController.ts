import { Response, Request } from "express";
import { container } from "tsyringe";
import ListEstablishmentUsersDiaryService from "@establishments/services/ListEstablishmentUsersDiaryService";
import ListUsersDiaryService from "@establishments/services/ListUsersDiaryService";

class EstablishmentUsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { date } = request.params;
    // @ts-ignore
    const establishment = request.establishment;

    const listEstablishmentUsersDiaryService = container.resolve(
      ListEstablishmentUsersDiaryService
    );

    const users = await listEstablishmentUsersDiaryService.execute(
      establishment,
      date
    );

    return response.status(200).json(users);
  }

  public async indexTotal(request: Request, response: Response): Promise<Response> {
    const { date } = request.params;

    const listUsersDiaryService = container.resolve(
      ListUsersDiaryService
    );

    const users = await listUsersDiaryService.execute(
      date
    );

    return response.status(200).json(users);
  }
}

export default new EstablishmentUsersController();
