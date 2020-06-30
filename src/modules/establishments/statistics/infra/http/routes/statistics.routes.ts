import { Router } from "express";
import statisticTypesRouter from "@establishments/statistics/statistic-types/infra/http/routes/statisticTypes.routes";
import ensureRole from "@shared/infra/http/middlewares/ensureRole";
import StatisticsController from "../controllers/StatisticsController";
import StatisticsValidator from "../../validators/StatisticsValidator";

const statisticsRouter = Router();

statisticsRouter.use(ensureRole("Administrador"));
statisticsRouter.get("/index", StatisticsController.index);
statisticsRouter.get("/show:id", StatisticsController.show);
statisticsRouter.post(
  "/create",
  StatisticsValidator.create,
  StatisticsController.create
);
statisticsRouter.use("/types", statisticTypesRouter);

export default statisticsRouter;
