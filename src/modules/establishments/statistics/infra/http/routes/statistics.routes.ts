import { Router } from "express";
import statisticTypesRouter from "@establishments/statistics/statistic-types/infra/http/routes/statisticTypes.routes";
import StatisticsController from "../controllers/StatisticsController";
import StatisticsValidator from "../../validators/StatisticsValidator";
import KeycloakConfig from "@shared/keycloak/keycloak-config";

const statisticsRouter = Router();
const keycloak = KeycloakConfig.getKeycloak()

statisticsRouter.get("/index", keycloak.protect("realm:admin"), StatisticsController.index);
statisticsRouter.get("/show:id", keycloak.protect("realm:admin"),StatisticsController.show);
statisticsRouter.post(
  "/create",
  keycloak.protect("realm:admin"),
  StatisticsValidator.create,
  StatisticsController.create
);
statisticsRouter.use("/types", statisticTypesRouter);

export default statisticsRouter;
