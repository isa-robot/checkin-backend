import { Response, Request } from "express";
import { container } from "tsyringe";
import ListEstablishmentUsersDiaryService from "@establishments/services/ListEstablishmentUsersDiaryService";
import ListUsersDiaryService from "@establishments/services/ListUsersDiaryService";
import KeycloakAdmin from '@shared/keycloak/keycloak-admin'


class EstablishmentUsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { date } = request.params;
    // @ts-ignore
    const establishment = request.establishment;
    establishment.users = await KeycloakAdmin.usersListComplete();
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
