import { Router } from "express";

import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import DiariesValidator from "../../validators/DiariesValidator";
import DiariesController from "../controllers/DiariesController";
import ensureEstablishment from "@shared/infra/http/middlewares/ensureEstablishment";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const diariesRouter = Router();

diariesRouter.use(ensureAuthenticated,ensureResource("diary"));
diariesRouter.post(
  "/",
  ensureAuthenticated,
  ensureEstablishment,
  DiariesValidator.create,
  DiariesController.create
);
diariesRouter.get("/:id", DiariesController.show);
diariesRouter.get("/date/:date", DiariesController.showByDate);

export default diariesRouter;
