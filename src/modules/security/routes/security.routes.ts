import { Router } from "express";

import resourcesRouter from "@security/resources/infra/http/routes/resources.routes";
import rolesRouter from "@security/roles/infra/http/routes/roles.routes";
import KeycloakConfig from '@shared/keycloak/keycloak-config'

const routes = Router();
const keycloak = KeycloakConfig.getKeycloak()

routes.use("/resources", resourcesRouter);
routes.use("/roles", rolesRouter);

export default routes;
