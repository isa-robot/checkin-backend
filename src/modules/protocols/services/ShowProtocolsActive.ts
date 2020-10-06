import { inject, injectable } from "tsyringe";
import Protocol from "@protocols/infra/typeorm/entities/Protocol";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
@injectable()
class ShowProtocolsActive {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute(): Promise<Protocol[] | undefined> {
    const protocols = await this.protocolRepository.findProtocolsActive();

    return protocols;
  }
}

export default ShowProtocolsActive;
