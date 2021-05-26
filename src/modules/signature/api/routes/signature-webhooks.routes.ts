import {Router} from "express";
import SignatureController from "@modules/signature/api/controllers/SignatureController";
import ensureSignatureWebhook from "@shared/infra/http/middlewares/ensureSignatureWebhook";

const signatureWebhooksRoutes = Router();

signatureWebhooksRoutes.use(ensureSignatureWebhook)
signatureWebhooksRoutes.post("/", SignatureController.receiveSign.bind(SignatureController));

export default signatureWebhooksRoutes;
