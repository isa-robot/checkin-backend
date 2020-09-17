import { inject, injectable } from "tsyringe";
import ICfpngRepository from "../repositories/ICfpngRepository";
import Cfpng from "../infra/typeorm/entities/Cfpng";
import AppError from "@shared/errors/AppError";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin"

@injectable()
class ShowCfpngService {
  constructor(
    @inject("CfpngRepository")
    private cfpngRepository: ICfpngRepository
  ) { }

  public async execute(id: string): Promise<Cfpng | any> {
    const cfpng = await this.cfpngRepository.findByUser(id);

    if (!cfpng) {
      throw new AppError("protocolo cfpng não encontrado", 404);
    }

    const user = await KeycloakAdmin.getUserById(cfpng.userId)

    return {diary: cfpng, user};
  }
}

export default ShowCfpngService;
