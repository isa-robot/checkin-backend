import { inject, injectable } from "tsyringe";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";

@injectable()
class ListEstablishmentsService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) { }

  public async execute(): Promise<Establishment[]> {
    const establishments = await this.establishmentsRepository.findAll();

    return establishments;
  }
}

export default ListEstablishmentsService;
