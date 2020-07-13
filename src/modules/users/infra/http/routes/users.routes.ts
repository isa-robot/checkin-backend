import { Router } from "express";

import UsersValidator from "@modules/users/infra/validators/UsersValidator";
import UsersController from "@modules/users/infra/http/controllers/UsersController";
import baselinesRouter from "@users/baselines/infra/http/routes/baselines.routes";
// import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureRole from "@shared/infra/http/middlewares/ensureRole";
import diariesRouter from "@users/diaries/infra/http/routes/diaries.routes";
import tokensRouter from "@users/tokens/infra/http/routes/tokens.routes";

const usersRouter = Router();

usersRouter.post("/", UsersValidator.create, UsersController.create);
usersRouter.put("/",  UsersValidator.update, UsersController.update);//TODO ensureAuthenticated
usersRouter.get(
  "/:id",
  ensureRole("Administrador"),
  UsersController.show
);//TODO ensureAuthenticated
// usersRouter.get(
//   "/",
//   ensureRole("Administrador"),
//   UsersController.index
// );//TODO ensureAuthenticated
usersRouter.use("/baselines", baselinesRouter);//TODO ensureAuthenticated
usersRouter.use("/diaries", diariesRouter);//TODO ensureAuthenticated
usersRouter.use("/tokens", tokensRouter);

export default usersRouter;
