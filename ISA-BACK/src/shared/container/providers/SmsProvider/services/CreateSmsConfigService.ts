import { inject, injectable } from "tsyringe";

import Sms from "@shared/container/providers/SmsProvider/infra/typeorm/entities/Sms";
import ISmsRepository from "@shared/container/providers/SmsProvider/repositories/ISmsRepository";

interface Request {
  zenviaSecretKey: string;
  chanel: string
  from: string;
}
@injectable()
class CreateSmsConfigService {
  constructor(
    @inject("SmsRepository")
    private smsRepository: ISmsRepository
  ) { }

  public async execute({
                         zenviaSecretKey,
                         chanel,
                         from
                       }:Request): Promise<Sms>{

    const checkSmsConfig = await this.smsRepository.findSmsConfig()
    if(checkSmsConfig.length > 0){
      const sms = checkSmsConfig[0]
      sms.zenviaSecretKey = zenviaSecretKey
      sms.chanel = chanel
      sms.from = from
      const updateSmsConfig = await this.smsRepository.save(sms)
      return updateSmsConfig
    } else {
      const createSmsConfig = await this.smsRepository.create({
        zenviaSecretKey,
        chanel,
        from,
      });
      return createSmsConfig;
    }
  }
}
export default CreateSmsConfigService
