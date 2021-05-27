import {
  IDocumentResponse,
  IDocumentSignerResponse,
  IDocumentsResponse,
  ISignerResponse
} from "@modules/signature/interfaces/dtos/ISignatureResponsesDTO";
import {
  IDocumentSignerRequest,
  ISendSolicitationRequest,
  ISignerRequest
} from "@modules/signature/interfaces/dtos/ISignatureRequestsDTO";

export default interface ISignatureProvider {
  showDocuments(page?: number): Promise<IDocumentsResponse>;
  duplicateDocument(documentKey: string): Promise<IDocumentResponse>;
  createSigner(signerRequest: ISignerRequest): Promise<ISignerResponse>;
  addSignerToDocument(documentSigner: IDocumentSignerRequest): Promise<IDocumentSignerResponse>;
  sendSolicitation(documentSigner: ISendSolicitationRequest): Promise<any>;
}
