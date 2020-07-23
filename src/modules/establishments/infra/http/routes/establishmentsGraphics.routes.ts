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
  ensureEstablishment,
  EstablishmentUsersController.index
);

establishmentsGraphicsRouter.get(
  "/total-users/:date",
  keycloak.protect("realm:admin"),
  ensureEstablishment,
  EstablishmentUsersController.indexTotal
);

establishmentsGraphicsRouter.get(
  "/approved-not-approved/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  ensureEstablishment,
  EstablishmentGraphicsController.approvedNotApproved
);

establishmentsGraphicsRouter.get(
  "/accession/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  ensureEstablishment,
  EstablishmentGraphicsController.accession
);

establishmentsGraphicsRouter.get(
  "/symptoms",
  keycloak.protect("realm:admin"),
  ensureEstablishment,
  EstablishmentGraphicsController.symptoms
);

establishmentsGraphicsRouter.get(
  "/total-approved-not-approved/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  ensureEstablishment,
  EstablishmentGraphicsController.approvedNotApprovedTotal
);

establishmentsGraphicsRouter.get(
  "/total-accession/:startDate/:endDate",
  keycloak.protect("realm:admin"),
  ensureEstablishment,
  EstablishmentGraphicsController.accessionTotal
);

establishmentsGraphicsRouter.get(
  "/total-symptoms",
  keycloak.protect("realm:admin"),
  ensureEstablishment,
  EstablishmentGraphicsController.symptomsTotal
);

export default establishmentsGraphicsRouter;
