import { inject, injectable } from "tsyringe";
import IProtocolRepository from "@protocols/repositories/IProtocolRepository";
import ICreateProtocolDTO from "../dtos/ICreateProtocolDTO";

@injectable()
class UpdateProtocol {
  constructor(
    @inject("ProtocolRepository")
    private protocolRepository: IProtocolRepository
  ) { }

  public async execute(protocol: ICreateProtocolDTO) {
    await this.protocolRepository.updateProtocol(protocol);
  }
}

export default UpdateProtocol;
