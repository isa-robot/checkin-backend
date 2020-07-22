import GenreEnum from "@users/baselines/enums/GenreEnum";
import RaceEnum from "@users/baselines/enums/RaceEnum";
import User from "@users/infra/typeorm/entities/User";

export default interface ICreateUserBaselineDTO {
  age: number;
  genre: GenreEnum;
  race: RaceEnum;
  weight: number;
  height: number;
  city: string;
  recent_appointments: boolean;
  contact_covid19: boolean;
  mask: boolean;
  userId: string;
  occupation: string;
  occupation_local: string;
  hypertension: boolean;
  diabetes: boolean;
  heart_disease: boolean;
  lung_disease: boolean;
  asthma: boolean;
  smoking: boolean;
  kidney_disease: boolean;
  cancer: boolean;
  corticosteroids_or_methotrexate: boolean;
  gestation: boolean;
}
