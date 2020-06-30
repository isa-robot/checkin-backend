import { Router } from 'express';

import ResourcesController from '../controllers/ResourcesController';
import ResourcesValidator from '@security/resources/infra/validators/ResourcesValidator';

const resourcesRouter = Router();

resourcesRouter.post(
    '/',
    ResourcesValidator.create,
    ResourcesController.create,
);
resourcesRouter.get('/:id', ResourcesController.show);
resourcesRouter.get('/', ResourcesController.index);
export default resourcesRouter;
