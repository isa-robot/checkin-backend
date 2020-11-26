import IUserRepresentation from "@users/csvRegister/Interfaces/user/IUserRepresentation";
import Stream from "stream";

export default interface IRegisterFromCsvService {
  csvToJson(fileStream: Stream.Readable): PromiseLike<IUserRepresentation[]>;
  registerUsers(users: IUserRepresentation[]): Promise<any>;
}
