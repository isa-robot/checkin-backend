import { inject, injectable } from "tsyringe";
import Protocol from "@protocols/infra/typeorm/entities/Protocol";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
@injectable()
class ShowProtocolsActiveByUser {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute(data: {userId: string}): Promise<Protocol[] | undefined> {
    const protocol = await this.protocolRepository.findProtocolsActiveByUser(data.userId);
    return protocol;
  }
}

export default ShowProtocolsActiveByUser;
