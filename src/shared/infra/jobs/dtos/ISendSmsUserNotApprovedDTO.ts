import User from "@users/users/infra/typeorm/entities/User";

export default interface ISendSmsUserNotApprovedDTO {
  name: string;
  attended: string;
  establishment: string;
  phone: string;
}
