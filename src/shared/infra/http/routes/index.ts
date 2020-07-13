import { Router } from "express";

import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import securityRouter from "@security/routes/security.routes";
import establishmentsRouter from "@establishments/infra/http/routes/establishments.routes";
import UsersController from "../../../../controllers/users/UsersController";

const routes = Router();
const keycloak = require('../../../../config/keycloak/keycloak-config').initKeycloak()
console.info(keycloak)

routes.use("/sessions", sessionsRouter);
routes.get("/users", keycloak.protect('user'),UsersController.getUsers);
routes.use("/security", securityRouter);
routes.use("/establishments", establishmentsRouter);

export default routes;
