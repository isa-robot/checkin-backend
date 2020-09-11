import { Router } from "express";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import CfpngController from "@protocols/cfpng/infra/http/controllers/CfpngController";
import CfpngValidator from "@protocols/cfpng/infra/validators/CfpngValidator";
import ensureEstablishment from "@shared/infra/http/middlewares/ensureEstablishment";

const cfpngRouter = Router();

cfpngRouter.use(ensureAuthenticated, ensureResource("diary"));
cfpngRouter.post("/", ensureEstablishment, CfpngValidator.create, CfpngController.create);

export default cfpngRouter;
