import { Router } from "express";

import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import securityRouter from "@security/routes/security.routes";
import establishmentsRouter from "@establishments/infra/http/routes/establishments.routes";
import UsersController from "../../../../controllers/users/UsersController";
import {Grant} from "keycloak-connect";

const routes = Router();
const keycloak = require('../../../../config/keycloak/keycloak-config').initKeycloak()

routes.use(keycloak.middleware())
routes.use("/sessions", sessionsRouter);
routes.get("/users", keycloak.protect('realm:user'), UsersController.getUser);
routes.use("/security", securityRouter);
routes.use("/establishments", establishmentsRouter);

export default routes;
