import { inject, injectable } from "tsyringe";
import Protocol from "@protocols/infra/typeorm/entities/Protocol";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
interface Request {
  userId: string
}
@injectable()
class ListStatisticsService {
  constructor(
    @inject("protocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute( data: Request ): Promise<Protocol[] | undefined> {
    const protocols = await this.protocolRepository.findProtocolByUser(data.userId);

    return protocols;
  }
}

export default ListStatisticsService;
