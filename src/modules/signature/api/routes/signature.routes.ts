import {Router} from "express";
import SignatureController from "@modules/signature/api/controllers/SignatureController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureResource from "@shared/infra/http/middlewares/ensureResource";

const signatureRoutes = Router();

signatureRoutes.use(ensureAuthenticated, ensureResource("diary"))
signatureRoutes.get("/documents", SignatureController.showDocuments.bind(SignatureController));
signatureRoutes.post("/document-signer", SignatureController.genDocumentSigner.bind(SignatureController));
signatureRoutes.post("/send-solicitation", SignatureController.sendSignatureSolicitation.bind(SignatureController));

export default signatureRoutes;
