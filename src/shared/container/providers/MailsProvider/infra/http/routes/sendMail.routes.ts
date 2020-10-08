import { Router } from "express";
import SendMailController from "@shared/container/providers/MailsProvider/infra/http/controllers/SendMailController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";

const sendMailRouter = Router()

sendMailRouter.use(ensureAuthenticated,ensureResource("diary"));

sendMailRouter.post("/toHealthService", SendMailController.toHealthDestinatary)

export default sendMailRouter
