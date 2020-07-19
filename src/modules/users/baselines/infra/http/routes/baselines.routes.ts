import { Router } from "express";

import BaselinesValidator from "@users/baselines/infra/validators/BaselinesValidator";
import BaselinesController from "@users/baselines/infra/http/controllers/BaselinesController";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import KeycloakConnect from '@shared/keycloak/keycloak-config'

const baselineRouter = Router();
const keycloak = KeycloakConnect.getKeycloak()

baselineRouter.post("/", keycloak.protect("realm:admin"),BaselinesValidator.create, BaselinesController.create);
baselineRouter.get("/:id", keycloak.protect("realm:admin"),BaselinesController.show);

export default baselineRouter;
