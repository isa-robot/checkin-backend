import cfpngRouter from "@protocols/cfpng/infra/http/routes/cfpng.routes";
import {Router} from "express";

const protocolsRouter = Router()

protocolsRouter.use("/cfpng", cfpngRouter)

export default protocolsRouter;
