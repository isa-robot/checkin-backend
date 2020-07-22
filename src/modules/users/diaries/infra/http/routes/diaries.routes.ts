import { Router } from "express";

import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import DiariesValidator from "../../validators/DiariesValidator";
import DiariesController from "../controllers/DiariesController";
import ensureEstablishment from "@shared/infra/http/middlewares/ensureEstablishment";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import KeycloakConfig from "@shared/keycloak/keycloak-config";

const diariesRouter = Router();
const keycloak = KeycloakConfig.getKeycloak()

diariesRouter.use(ensureAuthenticated,ensureResource("diary"));
diariesRouter.post(
  "/",
  keycloak.protect("realm:admin"),
  // ensureEstablishment,
  DiariesValidator.create,
  DiariesController.create
);
diariesRouter.get("/:id", keycloak.protect("realm:admin"), DiariesController.show);
diariesRouter.get("/date/:date", keycloak.protect("realm:admin"), DiariesController.showByDate);

export default diariesRouter;
