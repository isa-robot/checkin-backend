import { Router } from "express";

import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import DiariesValidator from "../../validators/DiariesValidator";
import DiariesController from "../controllers/DiariesController";
import ensureEstablishment from "@shared/infra/http/middlewares/ensureEstablishment";

const diariesRouter = Router();

diariesRouter.use(ensureResource("Diário"));
diariesRouter.post(
  "/",
  ensureEstablishment,
  DiariesValidator.create,
  DiariesController.create
);
diariesRouter.get("/:id", DiariesController.show);
diariesRouter.get("/date/:date", DiariesController.showByDate);

export default diariesRouter;
