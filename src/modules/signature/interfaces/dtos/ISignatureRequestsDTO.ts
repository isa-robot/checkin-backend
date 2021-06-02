import ISigner from "@modules/signature/interfaces/ISigner";
import IDocumentSigner from "@modules/signature/interfaces/IDocumentSigner";
import ICreateDocument from "@modules/signature/interfaces/ICreateDocument";

export interface ISignerRequest {
  signer: ISigner;
}

export interface ICreateDocumentRequest {
  document: ICreateDocument;
}

export interface IDocumentSignerRequest {
  list: IDocumentSigner;
}

export interface ISendSolicitationRequest {
  request_signature_key?: string,
  message?: string,
  url?: string,
}
