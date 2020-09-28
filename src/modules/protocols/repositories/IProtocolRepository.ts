import Protocol from "@protocols/infra/typeorm/entities/Protocol";
import ICreateProtocolDTO from "@protocols/dtos/ICreateProtocolDTO";

export default interface IProtocolRepository {
  create(data: ICreateProtocolDTO): Promise<Protocol>;
  findByProtocolId(protocolId: string): Promise<Protocol | undefined>;
}
