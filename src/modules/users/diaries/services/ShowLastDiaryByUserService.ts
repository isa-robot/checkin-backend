import { inject, injectable } from "tsyringe";
import IDiariesRepository from "../repositories/IDiariesRepository";
import Diary from "../infra/typeorm/entities/Diary";
import AppError from "@shared/errors/AppError";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin"

@injectable()
class ShowLastDiaryByUserService {
  constructor(
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository
  ) { }

  public async execute(userId: string): Promise<Diary | any> {
    const diary = await this.diariesRepository.findLastByUser(userId);

    const user = await KeycloakAdmin.getUserById(userId)

    return {diary: diary, user};
  }
}

export default ShowLastDiaryByUserService;
