import { Router } from "express";
import EstablishmentsController from "../controllers/EstablishmentsController";
import EstablishmentsValidator from "@establishments/infra/validators/EstablishmentsValidator";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureRole from "@shared/infra/http/middlewares/ensureRole";
import establishmentsGraphicsRouter from "@establishments/infra/http/routes/establishmentsGraphics.routes";
import statisticsRouter from "@establishments/statistics/infra/http/routes/statistics.routes";
import KeycloakConfig from '@shared/keycloak/keycloak-config'
import ensureResource from '@shared/infra/http/middlewares/ensureResource';

const establishmentsRouter = Router();
const keycloak = KeycloakConfig.getKeycloak()

establishmentsRouter.use(ensureAuthenticated);
establishmentsRouter.get(
  "/show/:id",
  keycloak.protect("realm:admin"),
  EstablishmentsController.show
);
establishmentsRouter.get(
  "/index",
  keycloak.protect("realm:admin"),
  EstablishmentsController.index
);
establishmentsRouter.use("/graphics", establishmentsGraphicsRouter);
establishmentsRouter.use("/statistics", statisticsRouter);

export default establishmentsRouter;
