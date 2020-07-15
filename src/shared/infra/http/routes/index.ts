import { Router } from "express";

import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import securityRouter from "@security/routes/security.routes";
import establishmentsRouter from "@establishments/infra/http/routes/establishments.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/security", securityRouter);
routes.use("/establishments", establishmentsRouter);

export default routes;
