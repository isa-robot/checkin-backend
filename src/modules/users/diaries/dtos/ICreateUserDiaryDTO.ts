import User from "@users/users/infra/typeorm/entities/User";

export default interface ICreateUserDiaryDTO {
  userId: string;
  smellLoss: boolean;
  tasteLoss: boolean;
  appetiteLoss: boolean;
  fatigue: boolean;
  fever: boolean;
  cough: boolean;
  diarrhea: boolean;
  delirium: boolean;
  soreThroat: boolean;
  shortnessOfBreath: boolean;
  abdominalPain: boolean;
  chestPain: boolean;
  approved: boolean;
}
