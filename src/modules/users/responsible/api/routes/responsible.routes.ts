import {Router} from "express";
import ResponsibleController from "@users/responsible/api/controllers/ResponsibleController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const responsibleRoutes = Router();

responsibleRoutes.use(ensureAuthenticated)
responsibleRoutes.post("/", ResponsibleController.create.bind(ResponsibleController));

export default responsibleRoutes;
