import {getRepository, Repository, Not, MoreThanOrEqual} from "typeorm";
import ProtocolName from "@protocols/infra/typeorm/entities/ProtocolName";
import IProtocolListRepository from "@protocols/repositories/IProtocolListRepository";

class ProtocolListRepository implements IProtocolListRepository {
  private ormRepository: Repository<ProtocolName>;

  constructor() {
    this.ormRepository = getRepository(ProtocolName);
  }

  public async find(): Promise<ProtocolName[]> {
    const protocolList = this.ormRepository.find();
    return protocolList;
  }

}

export default ProtocolListRepository;
