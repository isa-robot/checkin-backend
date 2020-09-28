import Protocol from "@protocols/infra/typeorm/entities/Protocol";
import ICreateProtocolDTO from "@protocols/dtos/ICreateProtocolDTO";

export default interface IProtocolRepository {
  create(data: ICreateProtocolDTO): Promise<Protocol>;
  findProtocolByUser(userId: string): Promise<Protocol[] | undefined>;
  findLastProtocolByUser(userId: string): Promise<Protocol | undefined>;
}
