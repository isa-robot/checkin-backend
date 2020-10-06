import {getRepository, Repository, Not, MoreThanOrEqual} from "typeorm";
import Cfpng from "../entities/Cfpng";
import ICfpngRepository from "@protocols/cfpng/repositories/ICfpngRepository";
import ICreateCfpngDTO from "@protocols/cfpng/dtos/ICreateCfpngDTO";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";
import {formatISO, parseISO} from "date-fns";

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
    const cfpng = this.ormRepository.findOne({ where: { userId } });

    return cfpng;
  }
  public async findLastByUser(userId: string): Promise<Cfpng | undefined> {
    const cfpng = this.ormRepository.findOne({ where: { userId }, order:{created_at: -1}});

    return cfpng;
  }

  findByProtocolId(protocolId: string): Promise<Cfpng[] | undefined> {
    const cfpng = this.ormRepository.find({ where: { protocol: protocolId } });

    return cfpng;
  }

  public async findByDateByUser(
    date: string,
    userId: string
  ): Promise<Cfpng | undefined> {
    return await this.ormRepository.findOne({
      where: {
        created_at:MoreThanOrEqual(
          new Date(formatISO(parseISO(date), { representation: "date" })))
        ,
        userId,
      },
    });
  }

}

export default CfpngRepository;
