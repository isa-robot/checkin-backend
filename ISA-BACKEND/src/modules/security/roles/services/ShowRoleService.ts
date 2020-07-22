import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import IRolesRepository from "../repositories/IRolesRepository";
import Role from "../infra/typeorm/entities/Role";

@injectable()
class ShowRoleService {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository
  ) { }

  public async execute(id: string): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError("Perfil não encontrado", 404);
    }

    return role;
  }
}

export default ShowRoleService;
