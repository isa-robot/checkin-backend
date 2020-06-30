import { inject, injectable } from "tsyringe";
import IBaselinesRepository from "../repositories/IBaselinesRepository";
import Baseline from "../infra/typeorm/entities/Baseline";
import ICreateUserBaselineDTO from "@users/baselines/dtos/ICreateUserBaselineDTO";

@injectable()
class CreateBaselineService {
  constructor(
    @inject("BaselinesRepository")
    private baselinesRepository: IBaselinesRepository
  ) { }

  public async execute({
    age,
    genre,
    race,
    weight,
    height,
    city,
    recent_appointments,
    contact_covid19,
    mask,
    user,
    occupation_local,
    occupation,
    hypertension,
    diabetes,
    heart_disease,
    lung_disease,
    asthma,
    smoking,
    kidney_disease,
    cancer,
    corticosteroids_or_methotrexate,
    gestation,
  }: ICreateUserBaselineDTO): Promise<Baseline> {
    const baseline = await this.baselinesRepository.create({
      age,
      genre,
      race,
      weight,
      height,
      city,
      recent_appointments,
      contact_covid19,
      mask,
      user,
      occupation_local,
      occupation,
      hypertension,
      diabetes,
      heart_disease,
      lung_disease,
      asthma,
      smoking,
      kidney_disease,
      cancer,
      corticosteroids_or_methotrexate,
      gestation,
    });

    return baseline;
  }
}

export default CreateBaselineService;
