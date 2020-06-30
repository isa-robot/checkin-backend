import { Router } from 'express';

import RolesController from '../controllers/RolesController';
import RolesValidator from '../../validators/RolesValidator';

const rolesRouter = Router();

rolesRouter.post('/', RolesValidator.create, RolesController.create);
rolesRouter.get('/:id', RolesController.show);
rolesRouter.get('/', RolesController.index);
export default rolesRouter;
