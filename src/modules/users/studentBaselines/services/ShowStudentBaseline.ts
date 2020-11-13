import { inject, injectable } from "tsyringe";
import IStudentBaselinesRepository from "../repositories/IStudentBaselinesRepository";
import Baseline from "../infra/typeorm/entities/StudentBaselines";
import KeycloakAdmin from '@shared/keycloak/keycloak-admin'
@injectable()
class ShowStudentBaseline {
  constructor(
    @inject("StudentBaselinesRepository")
    private studentBaselinesRepository: IStudentBaselinesRepository
  ) { }

  public async execute(userId: string): Promise<Baseline | any> {
    const baseline = await this.studentBaselinesRepository.findByUserId(userId);

    const user = await KeycloakAdmin.getUserById(userId)

    return {baseline: baseline, user};
  }
}

export default ShowStudentBaseline;
