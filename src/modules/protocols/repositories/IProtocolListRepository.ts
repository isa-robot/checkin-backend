import ProtocolName from "@protocols/infra/typeorm/entities/ProtocolName";

export default interface IProtocolListRepository {
  find(): Promise<ProtocolName[]>;
}
