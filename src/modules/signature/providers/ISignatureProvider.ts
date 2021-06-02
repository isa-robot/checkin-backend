import {
  IDocumentResponse,
  IDocumentSignerResponse,
  IDocumentsResponse,
  ISignerResponse
} from "@modules/signature/interfaces/dtos/ISignatureResponsesDTO";
import {
  ICreateDocumentRequest,
  IDocumentSignerRequest,
  ISendSolicitationRequest,
  ISignerRequest
} from "@modules/signature/interfaces/dtos/ISignatureRequestsDTO";

export default interface ISignatureProvider {
  showDocuments(page?: number): Promise<IDocumentsResponse>;
  duplicateDocument(documentKey: string): Promise<IDocumentResponse>;
  createDocument(document: ICreateDocumentRequest): Promise<IDocumentResponse>;
  createSigner(signerRequest: ISignerRequest): Promise<ISignerResponse>;
  addSignerToDocument(documentSigner: IDocumentSignerRequest): Promise<IDocumentSignerResponse>;
  sendSolicitation(documentSigner: ISendSolicitationRequest): Promise<any>;
}
