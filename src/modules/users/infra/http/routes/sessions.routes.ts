import { Router } from 'express';

import SessionsValidator from "@modules/users/infra/validators/SessionsValidator";
import SessionsController from "@modules/users/infra/http/controllers/SessionsController";

const sessionsRouter = Router();

sessionsRouter.post('/', SessionsValidator.create, SessionsController.create);

export default sessionsRouter;
