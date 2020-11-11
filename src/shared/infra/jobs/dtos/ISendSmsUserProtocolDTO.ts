import User from "@users/users/infra/typeorm/entities/User";

export default interface ISendSmsUserProtocolDTO {
  name: string;
  attended: string;
  establishment: string;
  phone: string;
}
