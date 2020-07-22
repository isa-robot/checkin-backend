import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import Resource from "../infra/typeorm/entities/Resource";
import IResourcesRepository from "../repositories/IResourcesRepository";

interface Request {
  name: string;
  to: string;
  icon: string;
}

@injectable()
class CreateResourceService {
  constructor(
    @inject("ResourcesRepository")
    private resourcesRepository: IResourcesRepository
  ) { }

  public async execute({ name, to, icon }: Request): Promise<Resource> {
    const checkNameUsed = await this.resourcesRepository.findByName(name);

    if (checkNameUsed) {
      throw new AppError("Nome já utilizado", 400);
    }

    const checkToUsed = await this.resourcesRepository.findByTo(to);

    if (checkToUsed) {
      throw new AppError("Caminho já utilizado", 400);
    }

    const resource = await this.resourcesRepository.create({
      name,
      to,
      icon,
    });

    return resource;
  }
}

export default CreateResourceService;
