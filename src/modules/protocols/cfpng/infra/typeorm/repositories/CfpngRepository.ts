import { getRepository, Repository, Not } from "typeorm";
import Cfpng from "../entities/Cfpng";
import ICfpngRepository from "@protocols/cfpng/repositories/ICfpngRepository";
import ICreateCfpngDTO from "@protocols/cfpng/dtos/ICreateCfpngDTO";

class CfpngRepository implements ICfpngRepository {
  private ormRepository: Repository<Cfpng>;

  constructor() {
    this.ormRepository = getRepository(Cfpng);
  }

  public async create(data: ICreateCfpngDTO): Promise<Cfpng> {
    const cfpng = this.ormRepository.create(data);

    await this.ormRepository.save(cfpng);

    return cfpng;
  }

  public async findByUser(userId: string): Promise<Cfpng | undefined> {
    const establishment = this.ormRepository.findOne({ where: { userId } });

    return establishment;
  }

}

export default CfpngRepository;
