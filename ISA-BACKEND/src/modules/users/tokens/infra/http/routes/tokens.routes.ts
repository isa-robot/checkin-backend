import { Router } from 'express';
import TokensValidators from '../../validators/TokensValidators';
import TokensController from '../controllers/TokensController';

const tokensRouter = Router();

tokensRouter.post('/forgot', TokensValidators.create, TokensController.create);
tokensRouter.post('/reset', TokensValidators.reset, TokensController.reset);

export default tokensRouter;
