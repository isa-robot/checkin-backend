import { inject, injectable } from "tsyringe";
import Protocol from "@protocols/infra/typeorm/entities/Protocol";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
@injectable()
class ShowProtocolActiveByNameByUser {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute(data: {protocolName: string, userId: string}): Promise<Protocol | undefined> {
    const protocol = await this.protocolRepository.findProtocolActiveByNameByUser(data.userId, data.protocolName);
    return protocol;
  }
}

export default ShowProtocolActiveByNameByUser;
