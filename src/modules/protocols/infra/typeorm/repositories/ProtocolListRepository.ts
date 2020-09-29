import {getRepository, Repository, Not, MoreThanOrEqual} from "typeorm";
import ProtocolList from "@protocols/infra/typeorm/entities/ProtocolList";
import IProtocolListRepository from "@protocols/repositories/IProtocolListRepository";

class ProtocolListRepository implements IProtocolListRepository {
  private ormRepository: Repository<ProtocolList>;

  constructor() {
    this.ormRepository = getRepository(ProtocolList);
  }

  public async find(): Promise<ProtocolList[]> {
    const protocolList = this.ormRepository.find();
    return protocolList;
  }

}

export default ProtocolListRepository;
