import { getRepository, Repository, Not } from "typeorm";
import Sms from "../entities/Sms";
import ISmsRepository from "@shared/container/providers/SmsProvider/repositories/ISmsRepository";
import ISmsConfigDTO from "@shared/container/providers/SmsProvider/dtos/ISmsConfigDTO";

class SmsRepository implements ISmsRepository {

  private ormRepository: Repository<Sms>

  constructor() {
    this.ormRepository = getRepository(Sms);
  }

  public async create(data: ISmsConfigDTO): Promise<Sms> {
    const mailerEthereal = this.ormRepository.create(data);

    await this.ormRepository.save(mailerEthereal);

    return mailerEthereal;
  }

  public async findSmsConfig(): Promise<Sms[]> {
    const mail = this.ormRepository.find()

    return mail;
  }

  public async save(smsConfig: Sms): Promise<Sms> {
    return await this.ormRepository.save(smsConfig);
  }

  public async remove(smsConfig: Sms): Promise<Sms>{
    return await this.ormRepository.remove(smsConfig)
  }

}

export default SmsRepository;
