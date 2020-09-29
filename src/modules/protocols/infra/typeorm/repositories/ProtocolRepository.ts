import {getRepository, Repository, Not, MoreThanOrEqual} from "typeorm";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import Protocol from "../entities/Protocol";
import ICreateProtocolDTO from "@protocols/dtos/ICreateProtocolDTO";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";
import {formatISO, parseISO} from "date-fns";
import {string} from "yup";

class ProtocolRepository implements IProtocolRepository {
  private ormRepository: Repository<Protocol>;

  constructor() {
    this.ormRepository = getRepository(Protocol);
  }

  public async create(data: ICreateProtocolDTO): Promise<Protocol> {
    const protocol = this.ormRepository.create(data);

    await this.ormRepository.save(protocol);

    return protocol;
  }
  public async updateProtocol(data: ICreateProtocolDTO): Promise<Protocol> {
    return await this.ormRepository.save(data);
  }

  public async findProtocolByUser(userId: string): Promise<Protocol[] | undefined> {
    const protocol = this.ormRepository.find({ where: { userId }, order:{created_at: -1} });

    return protocol;
  }
  public async findProtocolActiveByNameByUser(userId: string, protocolName: string): Promise<Protocol | undefined> {
    const protocol = this.ormRepository.findOne({ where: { userId, protocolName: protocolName, active: true }, order:{created_at: -1} });

    return protocol;
  }
  public async findLastProtocolByUser(userId: string): Promise<Protocol | undefined> {
    const protocol = this.ormRepository.findOne({ where: { userId }, order:{created_at: -1} });

    return protocol;
  }

}

export default ProtocolRepository;
