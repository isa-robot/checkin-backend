import { Router } from "express";

import KeycloakConfig from '@shared/keycloak/keycloak-config'
import EstablishmentUsersController from "../controllers/EstablishmentUsersController";
import ensureEstablishment from "@shared/infra/http/middlewares/ensureEstablishment";
import EstablishmentGraphicsController from "../controllers/EstablishmentGraphicsController";

const establishmentsGraphicsRouter = Router();
const keycloak = KeycloakConfig.getKeycloak()

establishmentsGraphicsRouter.get(
  "/users/:date",
  keycloak.protect("realm:admin"),
  EstablishmentUsersController.index
);

establishmentsGraphicsRouter.get(
  "/total-users/:date",
  keycloak.protect("realm:admin"),
  EstablishmentUsersController.indexTotal
);

establishmentsGraphicsRouter.get(
  "/approved-not-approved/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  EstablishmentGraphicsController.approvedNotApproved
);

establishmentsGraphicsRouter.get(
  "/accession/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  EstablishmentGraphicsController.accession
);

establishmentsGraphicsRouter.get(
  "/symptoms",
  keycloak.protect("realm:admin"),
  EstablishmentGraphicsController.symptoms
);

establishmentsGraphicsRouter.get(
  "/total-approved-not-approved/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  EstablishmentGraphicsController.approvedNotApprovedTotal
);

establishmentsGraphicsRouter.get(
  "/total-accession/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  EstablishmentGraphicsController.accessionTotal
);

establishmentsGraphicsRouter.get(
  "/total-symptoms",
  keycloak.protect("realm:admin"),
  EstablishmentGraphicsController.symptomsTotal
);

export default establishmentsGraphicsRouter;
