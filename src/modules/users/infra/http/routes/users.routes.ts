import { Router } from "express";

import UsersValidator from "@modules/users/infra/validators/UsersValidator";
import UsersController from "@modules/users/infra/http/controllers/UsersController";
import baselinesRouter from "@users/baselines/infra/http/routes/baselines.routes";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureRole from "@shared/infra/http/middlewares/ensureRole";
import diariesRouter from "@users/diaries/infra/http/routes/diaries.routes";
import tokensRouter from "@users/tokens/infra/http/routes/tokens.routes";

const usersRouter = Router();

usersRouter.post("/", UsersValidator.create, UsersController.create);
usersRouter.put("/", ensureAuthenticated, UsersValidator.update, UsersController.update);
usersRouter.get(
  "/:id",
  ensureAuthenticated,
  ensureRole("Administrador"),
  UsersController.show
);
usersRouter.get(
  "/",
  ensureAuthenticated,
  ensureRole("Administrador"),
  UsersController.index
);
usersRouter.use("/baselines", ensureAuthenticated, baselinesRouter);
usersRouter.use("/diaries", ensureAuthenticated, diariesRouter);
usersRouter.use("/tokens", tokensRouter);

export default usersRouter;
