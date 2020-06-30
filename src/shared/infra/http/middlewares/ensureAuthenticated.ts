import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/auth";
import AppError from "@errors/AppError";
import { getConnection } from "typeorm";
import User from "@users/infra/typeorm/entities/User";
import Role from "@security/roles/infra/typeorm/entities/Role";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não encontrado!", 404);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    const user = await getConnection()
      .getRepository(User)
      .findOne({
        where: { id: sub },
        relations: ["baseline", "establishments"],
      });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const role = await getConnection()
      .getRepository(Role)
      .findOne({ where: { id: user.roleId }, relations: ["resources"] });

    if (!role) {
      throw new AppError("Perfil não encontrado", 404);
    }

    user.role = role;

    // @ts-ignore
    request.user = user;

    return next();
  } catch (err) {
    throw new AppError("Token inválido", 401);
  }
}
