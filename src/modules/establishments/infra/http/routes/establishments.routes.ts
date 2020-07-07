import { Router } from "express";
import EstablishmentsController from "../controllers/EstablishmentsController";
import EstablishmentsValidator from "@establishments/infra/validators/EstablishmentsValidator";
// import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureRole from "@shared/infra/http/middlewares/ensureRole";
import establishmentsGraphicsRouter from "@establishments/infra/http/routes/establishmentsGraphics.routes";
import statisticsRouter from "@establishments/statistics/infra/http/routes/statistics.routes";

const establishmentsRouter = Router();

//TODO remover
// establishmentsRouter.use(ensureAuthenticated);
establishmentsRouter.post(
  "/create",
  ensureRole("Administrador"),
  EstablishmentsValidator.create,
  EstablishmentsController.create
);
establishmentsRouter.get(
  "/show/:id",
  ensureRole("Administrador"),
  EstablishmentsController.show
);
establishmentsRouter.get(
  "/index",
  ensureRole("Administrador"),
  EstablishmentsController.index
);
establishmentsRouter.use("/graphics", establishmentsGraphicsRouter);
establishmentsRouter.use("/statistics", statisticsRouter);

export default establishmentsRouter;
