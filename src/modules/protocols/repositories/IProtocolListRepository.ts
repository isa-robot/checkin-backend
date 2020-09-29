import ProtocolList from "@protocols/infra/typeorm/entities/ProtocolList";

export default interface IProtocolListRepository {
  find(): Promise<ProtocolList[]>;
}
