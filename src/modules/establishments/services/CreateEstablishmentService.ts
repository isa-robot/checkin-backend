import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";

interface Request {
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  city: string;
  active: boolean;
}

@injectable()
class CreateEstablishmentService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) { }

  public async execute({
    name,
    email,
    cnpj,
    phone,
    city,
    active,
  }: Request): Promise<Establishment> {
    const checkCnpjUsed = await this.establishmentsRepository.findByCnpj(cnpj);

    if (checkCnpjUsed) {
      throw new AppError("CNPJ já utilizado", 400);
    }

    const checkNameUsed = await this.establishmentsRepository.findByName(name);

    if (checkNameUsed) {
      throw new AppError("Nome já utilizado", 400);
    }

    const establishment = await this.establishmentsRepository.create({
      name,
      email,
      cnpj,
      phone,
      city,
      active,
    });

    return establishment;
  }
}

export default CreateEstablishmentService;
