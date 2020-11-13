import { Router } from "express";

import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import StudentBaselinesValidator from "@users/studentBaselines/infra/validators/StudentBaselinesValidator";
import StudentBaselinesController from "@users/studentBaselines/infra/http/controllers/StudentBaselinesController";

const studentBaselineRouter = Router();

studentBaselineRouter.use(ensureAuthenticated, ensureResource("diary"));
studentBaselineRouter.post("/", StudentBaselinesValidator.create, StudentBaselinesController.create);
studentBaselineRouter.get("/:id", StudentBaselinesController.show);

export default studentBaselineRouter;
