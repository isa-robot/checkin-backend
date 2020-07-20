import { Router } from "express";

import BaselinesValidator from "@users/baselines/infra/validators/BaselinesValidator";
import BaselinesController from "@users/baselines/infra/http/controllers/BaselinesController";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import KeycloakConnect from '@shared/keycloak/keycloak-config'
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import diariesRouter from "@users/diaries/infra/http/routes/diaries.routes";

const baselineRouter = Router();
const keycloak = KeycloakConnect.getKeycloak()
diariesRouter.use(ensureAuthenticated,ensureResource("diary"));
baselineRouter.post("/", keycloak.protect("realm:admin"),BaselinesValidator.create, BaselinesController.create);
baselineRouter.get("/:id", BaselinesController.show);

export default baselineRouter;
