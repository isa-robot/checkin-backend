import { Router } from "express";
import StatisticTypeValidator from "../../validators/StatisticTypeValidator";
import StatisticTypesController from "../controllers/StatisticTypesController";

const statisticTypesRouter = Router();

statisticTypesRouter.post(
  "/create",
  StatisticTypeValidator.create,
  StatisticTypesController.create
);
statisticTypesRouter.get("/show/:id", StatisticTypesController.show);
statisticTypesRouter.get("/index", StatisticTypesController.index);

export default statisticTypesRouter;
