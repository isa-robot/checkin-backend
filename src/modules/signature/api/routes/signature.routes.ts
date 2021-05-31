import {Router} from "express";
import signatureManagementRoutes from "@modules/signature/api/routes/signature-management.routes";
import signatureWebhooksRoutes from "@modules/signature/api/routes/signature-webhooks.routes";
import SignatureController from "@modules/signature/api/controllers/SignatureController";

const signatureRoutes = Router();

signatureRoutes.use("/webhooks", signatureWebhooksRoutes);
signatureRoutes.post("/term", SignatureController.createDoc.bind(SignatureController));
signatureRoutes.use("/", signatureManagementRoutes);

export default signatureRoutes;
