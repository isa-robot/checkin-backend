import { Router } from "express";

import EstablishmentUsersController from "../controllers/EstablishmentUsersController";
import ensureEstablishment from "@shared/infra/http/middlewares/ensureEstablishment";
import EstablishmentGraphicsController from "../controllers/EstablishmentGraphicsController";

const establishmentsGraphicsRouter = Router();

establishmentsGraphicsRouter.get(
  "/users/:date",
  ensureEstablishment,
  EstablishmentUsersController.index
);

establishmentsGraphicsRouter.get(
  "/approved-not-approved/:startDate/:endDate",
  ensureEstablishment,
  EstablishmentGraphicsController.approvedNotApproved
);

establishmentsGraphicsRouter.get(
  "/accession/:startDate/:endDate",
  ensureEstablishment,
  EstablishmentGraphicsController.accession
);

establishmentsGraphicsRouter.get(
  "/symptoms",
  ensureEstablishment,
  EstablishmentGraphicsController.symptoms
);

establishmentsGraphicsRouter.get(
  "/total-approved-not-approved/:startDate/:endDate",
  ensureEstablishment,
  EstablishmentGraphicsController.approvedNotApprovedTotal
);

establishmentsGraphicsRouter.get(
  "/total-accession/:startDate/:endDate",
  ensureEstablishment,
  EstablishmentGraphicsController.accessionTotal
);

establishmentsGraphicsRouter.get(
  "/total-symptoms",
  ensureEstablishment,
  EstablishmentGraphicsController.symptomsTotal
);

export default establishmentsGraphicsRouter;
