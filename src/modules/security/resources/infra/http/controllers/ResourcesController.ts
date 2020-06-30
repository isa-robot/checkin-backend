import { Response, Request } from "express";
import { container } from "tsyringe";
import CreateResourceService from "@security/resources/services/CreateResourceService";
import ShowResourceService from "@security/resources/services/ShowResourceService";
import ListResourcesService from "@security/resources/services/ListResourcesService";

class ResourcesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, to, icon } = request.body;

    const createResourceService = container.resolve(CreateResourceService);

    const resource = await createResourceService.execute({
      name,
      to,
      icon,
    });

    return response.status(201).json(resource);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showResourceService = container.resolve(ShowResourceService);

    const resource = await showResourceService.execute(id);

    return response.status(200).json(resource);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listResourcesService = container.resolve(ListResourcesService);

    const resources = await listResourcesService.execute();

    return response.status(200).json(resources);
  }
}

export default new ResourcesController();
