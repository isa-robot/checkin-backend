import { Router } from "express";

import BaselinesValidator from "@users/baselines/infra/validators/BaselinesValidator";
import BaselinesController from "@users/baselines/infra/http/controllers/BaselinesController";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";

const baselineRouter = Router();

baselineRouter.use(ensureResource("Diário"));
baselineRouter.post("/", BaselinesValidator.create, BaselinesController.create);
baselineRouter.get("/:id", BaselinesController.show);

export default baselineRouter;
