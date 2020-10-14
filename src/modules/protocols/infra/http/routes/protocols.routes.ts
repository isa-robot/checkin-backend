import cfpngRouter from "@protocols/cfpng/infra/http/routes/cfpng.routes";
import {Router} from "express";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import ProtocolController from "@protocols/infra/http/controllers/ProtocolController";

const protocolsRouter = Router()

protocolsRouter.use(ensureAuthenticated, ensureResource("diary"));
protocolsRouter.use("/cfpng", cfpngRouter)
protocolsRouter.get("/pendent-and-answered/:protocolName", ProtocolController.indexPendentAndAnsweredByProtocolName)
protocolsRouter.get("/active/:protocolName", ProtocolController.indexProtocolActiveByNameByUser)
protocolsRouter.get("/active", ProtocolController.indexProtocolActiveByUser)
protocolsRouter.get("/active-mail-date/:protocolName", ProtocolController.indexProtocolMailDateByNameByUser)

export default protocolsRouter;
