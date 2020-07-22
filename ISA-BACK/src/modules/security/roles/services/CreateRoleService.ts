import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import IRolesRepository from "../repositories/IRolesRepository";
import IResourcesRepository from "@security/resources/repositories/IResourcesRepository";
import Role from "../infra/typeorm/entities/Role";

interface Request {
  name: string;
  resources: string[];
}

@injectable()
class CreateRoleService {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
    @inject("ResourcesRepository")
    private resourcesRepository: IResourcesRepository
  ) { }

  public async execute({ name, resources }: Request): Promise<Role> {
    const allResources = await Promise.all(
      resources.map(async (resourceId) => {
        const resource = await this.resourcesRepository.findById(resourceId);

        if (!resource) {
          throw new AppError("Recurso não encontrado", 404);
        }
        return resource;
      })
    );

    const chackNameUsed = await this.rolesRepository.findByName(name);

    if (chackNameUsed) {
      throw new AppError("Nome já utilizado", 400);
    }

    const role = await this.rolesRepository.create({
      name,
      resources: allResources,
    });

    return role;
  }
}

export default CreateRoleService;
