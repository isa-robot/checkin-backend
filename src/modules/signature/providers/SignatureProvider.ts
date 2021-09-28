import {AxiosInstance} from "axios";
import client from "@modules/signature/client/CustomClient";
import AppError from "@errors/AppError";
import {
  IDocumentResponse,
  IDocumentSignerResponse,
  IDocumentsResponse,
  ISignerResponse
} from "@modules/signature/interfaces/dtos/ISignatureResponsesDTO";
import ISignatureProvider from "@modules/signature/providers/ISignatureProvider";
import {
  ICreateDocumentRequest,
  IDocumentSignerRequest,
  ISendSolicitationRequest,
  ISignerRequest
} from "@modules/signature/interfaces/dtos/ISignatureRequestsDTO";
import ICreateDocument from "@modules/signature/interfaces/ICreateDocument";
import IDocument from "../interfaces/IDocument";

export default class SignatureProvider implements ISignatureProvider {
  client: AxiosInstance;
  signatureQueryToken?: string;

  constructor() {
    this.client = client;
    this.signatureQueryToken ="access_token=" + process.env.SIGNATURE_TOKEN;
  }

  async showDocuments(page: number = 1): Promise<IDocumentsResponse> {
    try {
      const { data } = await this.client.get<IDocumentsResponse>(`documents?${this.signatureQueryToken}&page=${page}`);
      return data;
    } catch (e) {
      throw new AppError(e);
    }
  }

  async findDocument(documentKey: string): Promise<IDocument> {
    try {
      const { data } = await this.client.get<{document:IDocument}>(`documents/${documentKey}?${this.signatureQueryToken}`);
      return data.document;
    } catch (e) {
      throw new AppError(e);
    }
  }

  async duplicateDocument(documentKey: string): Promise<IDocumentResponse> {
    try {
      const { data } = await this.client.post<IDocumentResponse>(`documents/${documentKey}/duplicate?${this.signatureQueryToken}`);
      return data;
    } catch (e) {
      throw new AppError(e);
    }
  }

  async createDocument(document: ICreateDocumentRequest): Promise<IDocumentResponse> {
    try {
      const { data } = await this.client.post<IDocumentResponse>(`documents?${this.signatureQueryToken}`, document);
      return data;
    } catch (e) {
      throw new AppError(e);
    }
  }

  async createSigner(signerRequest: ISignerRequest): Promise<ISignerResponse> {
    try {
      const { data } = await this.client.post<ISignerResponse>(`signers?${this.signatureQueryToken}`, signerRequest);
      return data;
    } catch (e) {
      throw new AppError(e);
    }
  }

  async addSignerToDocument(documentSigner: IDocumentSignerRequest): Promise<IDocumentSignerResponse> {
    try {
      const { data } = await this.client.post<IDocumentSignerResponse>(`lists?${this.signatureQueryToken}`, documentSigner);
      return data;
    } catch (e) {
      throw new AppError(e);
    }
  }

  async sendSolicitation(solicitationRequest: ISendSolicitationRequest): Promise<any> {
    try {
      const { data } = await this.client.post<any>(`notifications?${this.signatureQueryToken}`, solicitationRequest);
      return data;
    } catch (e) {
      throw new AppError(e);
    }
  }
}
