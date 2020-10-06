import ICreateCfpngDTO from "@protocols/cfpng/dtos/ICreateCfpngDTO";
import Cfpng from "@modules/protocols/cfpng/infra/typeorm/entities/Cfpng";
import Diary from "@users/diaries/infra/typeorm/entities/Diary";

export default interface ICfpngRepository {
  create(data: ICreateCfpngDTO): Promise<Cfpng>;
  findByUser(userId: string): Promise<Cfpng | undefined>;
  findLastByUser(userId: string): Promise<Cfpng | undefined>;
  findByProtocolId(protocolId: string): Promise<Cfpng[] | undefined>;
  findByDateByUser(date: string, userId: string): Promise<Cfpng | undefined>;
}
