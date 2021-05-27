import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";
import SignatureController from "@modules/signature/api/controllers/SignatureController";
import {Router} from "express";

const signatureManagementRoutes = Router();

signatureManagementRoutes.use(ensureAuthenticated, ensureResource("diary"))
signatureManagementRoutes.get("/documents", SignatureController.showDocuments.bind(SignatureController));
signatureManagementRoutes.post("/document-signer", SignatureController.genDocumentSigner.bind(SignatureController));
signatureManagementRoutes.post("/send-solicitation", SignatureController.sendSignatureSolicitation.bind(SignatureController));
signatureManagementRoutes.get("/by-user", SignatureController.showDocumentByUser.bind(SignatureController));

export default signatureManagementRoutes;
