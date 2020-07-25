import { Response, Request } from "express";
import { container } from "tsyringe";
import CreateEstablishmentService from "@modules/establishments/services/CreateEstablishmentService";
import ShowEstablishmentService from "@modules/establishments/services/ShowEstablishmentService";
import ListEstablishmentsService from "@modules/establishments/services/ListEstablishmentsService";

class EstablishmentsController {

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showEstablishmentService = container.resolve(
      ShowEstablishmentService
    );

    const establishment = await showEstablishmentService.execute(id);

    return response.status(200).json(establishment);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listEstablishmentService = container.resolve(
      ListEstablishmentsService
    );

    const establishments = await listEstablishmentService.execute();

    return response.status(200).json(establishments);
  }
}

export default new EstablishmentsController();
