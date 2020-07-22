import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import Resource from "../infra/typeorm/entities/Resource";
import IResourcesRepository from "../repositories/IResourcesRepository";

@injectable()
class ShowResourceService {
  constructor(
    @inject("ResourcesRepository")
    private resourcesRepository: IResourcesRepository
  ) { }

  public async execute(id: string): Promise<Resource> {
    const resource = await this.resourcesRepository.findById(id);

    if (!resource) {
      throw new AppError("Recurso não encontrado", 404);
    }

    return resource;
  }
}

export default ShowResourceService;
