import Protocol from "@protocols/infra/typeorm/entities/Protocol";
import ICreateProtocolDTO from "@protocols/dtos/ICreateProtocolDTO";
import {string} from "yup";

export default interface IProtocolRepository {
  create(data: ICreateProtocolDTO): Promise<Protocol>;
  updateProtocol(data: ICreateProtocolDTO): Promise<Protocol>;
  findProtocolByUser(userId: string): Promise<Protocol[] | undefined>;
  findLastProtocolByUser(userId: string): Promise<Protocol | undefined>;
  findProtocolActiveByNameByUser(userId: string, type: string): Promise<Protocol | undefined>
}
