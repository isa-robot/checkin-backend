import { inject, injectable } from "tsyringe";

import Sms from "@shared/container/providers/SmsProvider/infra/typeorm/entities/Sms";
import ISmsRepository from "@shared/container/providers/SmsProvider/repositories/ISmsRepository";

@injectable()
class RemoveSmsConfigService {
  constructor(
    @inject("SmsRepository")
    private smsRepository: ISmsRepository
  ) { }

  public async execute(): Promise<Sms>{

    const checkSmsConfig = await this.smsRepository.findSmsConfig()
    if(checkSmsConfig.length  > 0){
      const deleteSmsConfig = await this.smsRepository.remove(checkSmsConfig[0])
      return deleteSmsConfig;
    }else{
      throw new Error("nothing to delete")
      return {} as Sms
    }
  }
}
export default RemoveSmsConfigService
