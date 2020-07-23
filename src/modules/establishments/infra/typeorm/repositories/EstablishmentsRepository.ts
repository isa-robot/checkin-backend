import { getRepository, Repository, Not } from "typeorm";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import Establishment from "../entities/Establishment";
import ICreateEstablishmentsDTO from "@establishments/dtos/ICreateEstablishmentsDTO";

class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  public async create(data: ICreateEstablishmentsDTO): Promise<Establishment> {
    const establishment = this.ormRepository.create(data);

    await this.ormRepository.save(establishment);

    return establishment;
  }

  public async findByName(name: string): Promise<Establishment | undefined> {
    const establishment = this.ormRepository.findOne({ where: { name } });

    return establishment;
  }

  public async findByCnpj(cnpj: string): Promise<Establishment | undefined> {
    const establishment = this.ormRepository.findOne({ where: { cnpj } });

    return establishment;
  }

  public async findAll(): Promise<Establishment[]> {
    const establishments = this.ormRepository.find();

    return establishments;
  }

  public async findAllWithUsers(): Promise<Establishment[]> {
    const establishments = this.ormRepository.find({});

    return establishments;
  }

  public async findById(id: string): Promise<Establishment | undefined> {
    const establishment = this.ormRepository.findOne({
      where: { id }
    });

    return establishment;
  }

  public async save(establishment: Establishment): Promise<Establishment> {
    return await this.ormRepository.save(establishment);
  }
}

export default EstablishmentsRepository;
