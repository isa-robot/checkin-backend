import { inject, injectable } from "tsyringe";
import IBaselinesRepository from "../repositories/IBaselinesRepository";
import Baseline from "../infra/typeorm/entities/Baseline";
import AppError from "@shared/errors/AppError";

@injectable()
class ShowBaselineService {
  constructor(
    @inject("BaselinesRepository")
    private baselinesRepository: IBaselinesRepository
  ) { }

  public async execute(id: string): Promise<Baseline> {
    const baseline = await this.baselinesRepository.findById(id);

    if (!baseline) {
      throw new AppError("Baseline não encontrado", 404);
    }

    return baseline;
  }
}

export default ShowBaselineService;
