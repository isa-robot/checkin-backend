import { Response, Request, NextFunction } from "express";

import AppError from "@errors/AppError";
import { getConnection } from "typeorm";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";

export default async function ensureEstablishment(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const establishmentId = request.headers.establishment;

  if (!establishmentId) {
    throw new AppError("Identificado de Estabelecimento não encontrado", 404);
  }

  const establishment = await getConnection()
    .getRepository(Establishment)
    .findOne({
      where: { id: establishmentId },
      relations: ["users"],
    });

  if (!establishment) {
    throw new AppError("Estabelecimento não encontrado", 404);
  }

  // @ts-ignore
  request.establishment = establishment;

  return next();
}
