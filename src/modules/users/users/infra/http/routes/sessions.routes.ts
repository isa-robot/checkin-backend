import { Router } from 'express';

import SessionsValidator from "@users/users/infra/validators/SessionsValidator";
import SessionsController from "@users/users/infra/http/controllers/SessionsController";

const sessionsRouter = Router();

sessionsRouter.post('/', SessionsValidator.create, SessionsController.create);

export default sessionsRouter;
