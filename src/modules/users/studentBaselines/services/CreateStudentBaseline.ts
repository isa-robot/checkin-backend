import { inject, injectable } from "tsyringe";
import IStudentBaselinesRepository from "../repositories/IStudentBaselinesRepository";
import Baseline from "../infra/typeorm/entities/StudentBaselines";
import ICreateStudentBaselineDTO from "../dtos/ICreateStudentBaselineDTO";

@injectable()
class CreateStudentBaseline {
  constructor(
    @inject("StudentBaselinesRepository")
    private studentBaselinesRepository: IStudentBaselinesRepository
  ) { }

  public async execute({
    age,
    genre,
    grade,
    userId,
  }: ICreateStudentBaselineDTO): Promise<Baseline> {
    const baseline = await this.studentBaselinesRepository.create({
      age,
      genre,
      grade,
      userId,
    });

    return baseline;
  }
}

export default CreateStudentBaseline;
