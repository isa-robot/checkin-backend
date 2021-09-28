import { Response, Request, NextFunction } from "express";
import AppError from "@errors/AppError";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";

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

  try {
    // @ts-ignore
    const user = await KeycloakAdmin.getUserById(request.kauth.grant.access_token.content.sub)
    // @ts-ignore
    const roles = await KeycloakAdmin.getRoleFromUser(request.kauth.grant.access_token.content.sub)
    user.role = roles[0];
    user.role.resources = await KeycloakAdmin.getCompositeRoles(roles[0].id)
    // @ts-ignore
    request.user = user;

    return next();
  } catch (err) {
    throw new AppError("Token inválido", 401);
  }
}
