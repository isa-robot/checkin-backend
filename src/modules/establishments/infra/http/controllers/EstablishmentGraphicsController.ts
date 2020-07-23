import { Response, Request } from "express";
import { container } from "tsyringe";
import ListUsersApprovedNotApprovedByDateService from "@establishments/services/ListUsersApprovedNotApprovedByDateService";
import ListUsersAccessionService from "@establishments/services/ListUsersAccessionService";
import ListUsersSymptomsService from "@establishments/services/ListUsersSymptomsService";
import ListUsersApprovedNotApprovedByDateTotalService from "@establishments/services/ListUsersApprovedNotApprovedByDateTotalService";
import ListUsersAccessionTotalService from "@establishments/services/ListUsersAccessionTotalService";
import ListUsersSymptomsTotalService from "@establishments/services/ListUsersSymptomsTotalService";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";

class EstablishmentGraphicsController {
  public async approvedNotApproved(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { startDate, endDate } = request.params;
    // @ts-ignore
    const establishment = request.establishment;
    establishment.users = await KeycloakAdmin.usersListComplete();
    const listUsersApprovedNotApprovedByDateService = container.resolve(
      ListUsersApprovedNotApprovedByDateService
    );

    const data = await listUsersApprovedNotApprovedByDateService.execute(
      establishment,
      startDate,
      endDate
    );

    return response.status(200).json(data);
  }

  public async approvedNotApprovedTotal(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { startDate, endDate } = request.params;
    // @ts-ignore
    const establishment = request.establishment;

    const listUsersApprovedNotApprovedByDateTotalService = container.resolve(
      ListUsersApprovedNotApprovedByDateTotalService
    );

    const data = await listUsersApprovedNotApprovedByDateTotalService.execute(
      establishment,
      startDate,
      endDate
    );

    return response.status(200).json(data);
  }

  public async accession(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { startDate, endDate } = request.params;
    // @ts-ignore
    const establishment = request.establishment;

    const listUsersAccessionService = container.resolve(
      ListUsersAccessionService
    );

    const data = await listUsersAccessionService.execute(
      establishment,
      startDate,
      endDate
    );

    return response.status(200).json(data);
  }

  public async accessionTotal(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { startDate, endDate } = request.params;
    // @ts-ignore
    const establishment = request.establishment;

    const listUsersAccessionTotalService = container.resolve(
      ListUsersAccessionTotalService
    );

    const data = await listUsersAccessionTotalService.execute(
      establishment,
      startDate,
      endDate
    );

    return response.status(200).json(data);
  }

  public async symptoms(
    request: Request,
    response: Response
  ): Promise<Response> {
    // @ts-ignore
    const establishment = request.establishment;

    const listUsersSymptomsService = container.resolve(
      ListUsersSymptomsService
    );

    const data = await listUsersSymptomsService.execute(establishment);

    return response.status(200).json(data);
  }

  public async symptomsTotal(
    request: Request,
    response: Response
  ): Promise<Response> {
    // @ts-ignore
    const establishment = request.establishment;

    const listUsersSymptomsTotalService = container.resolve(
      ListUsersSymptomsTotalService
    );

    const data = await listUsersSymptomsTotalService.execute(establishment);

    return response.status(200).json(data);
  }
}

export default new EstablishmentGraphicsController();
