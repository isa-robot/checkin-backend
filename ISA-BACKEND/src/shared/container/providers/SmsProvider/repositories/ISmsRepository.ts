import Sms from "@shared/container/providers/SmsProvider/infra/typeorm/entities/Sms";
import ISmsConfigDTO from "@shared/container/providers/SmsProvider/dtos/ISmsConfigDTO"

export default interface ISmsRepository {
  create(config: ISmsConfigDTO): Promise<Sms>;
  findSmsConfig(): Promise<Sms[]>;
  save(config: Sms): Promise<Sms>;
  remove(mailerEtherea:Sms): Promise<Sms>
}
