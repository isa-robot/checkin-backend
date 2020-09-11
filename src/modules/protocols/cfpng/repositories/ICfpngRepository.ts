import ICreateCfpngDTO from "@protocols/cfpng/dtos/ICreateCfpngDTO";
import Cfpng from "@modules/protocols/cfpng/infra/typeorm/entities/Cfpng";

export default interface ICfpngRepository {
  create(data: ICreateCfpngDTO): Promise<Cfpng>;
  findByUser(userId: string): Promise<Cfpng | undefined>;
}
