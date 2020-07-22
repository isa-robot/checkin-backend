import { inject, injectable } from "tsyringe";

import Sms from "@shared/container/providers/SmsProvider/infra/typeorm/entities/Sms";
import ISmsRepository from "@shared/container/providers/SmsProvider/repositories/ISmsRepository";

@injectable()
class ListSmsConfigService {
  constructor(
    @inject("SmsRepository")
    private smsRepository: ISmsRepository
  ) { }

  public async execute(): Promise<Sms>{

    const checkSmsMails = await this.smsRepository.findSmsConfig()
    return checkSmsMails[0];
  }
}
export default ListSmsConfigService
