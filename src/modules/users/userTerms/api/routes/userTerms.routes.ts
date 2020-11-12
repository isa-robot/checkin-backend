import {Router} from 'express';
import UserTermsController from "@users/userTerms/api/Controllers/UserTermsController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";

const userTermsRouter = Router();

userTermsRouter.use(ensureAuthenticated, ensureResource("diary"));
userTermsRouter.post("/create", UserTermsController.create);
userTermsRouter.get("/index", UserTermsController.index);
userTermsRouter.get("/by-user", UserTermsController.byUserId);

export default userTermsRouter;
