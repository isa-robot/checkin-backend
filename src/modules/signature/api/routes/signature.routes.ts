import {Router} from "express";
import signatureManagementRoutes from "@modules/signature/api/routes/signature-management.routes";
import signatureWebhooksRoutes from "@modules/signature/api/routes/signature-webhooks.routes";

const signatureRoutes = Router();

signatureRoutes.use("/webhooks", signatureWebhooksRoutes);
signatureRoutes.use("/", signatureManagementRoutes);

export default signatureRoutes;
