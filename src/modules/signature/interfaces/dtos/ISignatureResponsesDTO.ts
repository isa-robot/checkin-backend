import IDocument from "@modules/signature/interfaces/IDocument";
import ISigner from "@modules/signature/interfaces/ISigner";
import IDocumentSigner from "@modules/signature/interfaces/IDocumentSigner";

export interface IDocumentsResponse {
  documents: IDocument[];
  page_infos: {
    total_pages: number;
    current_page: number;
    next_page: number;
    prev_page: number;
    "first_page?": number;
    "last_page?": number;
  }
}

export interface IDocumentResponse {
  document: IDocument;
}

export interface ISignerResponse {
  signer: ISigner
}

export interface IDocumentSignerResponse {
  list: IDocumentSigner;
}
