import ISignatureService from "@modules/signature/services/ISignatureService";
import IDocument from "@modules/signature/interfaces/IDocument";
import {delay, inject, injectable} from "tsyringe";
import SignatureProvider from "@modules/signature/providers/SignatureProvider";
import ISignatureProvider from "@modules/signature/providers/ISignatureProvider";
import {
  IDocumentResponse,
  IDocumentSignerResponse,
  ISignerResponse
} from "@modules/signature/interfaces/dtos/ISignatureResponsesDTO";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";
import SignerBuilder from "@modules/signature/builder/SignerBuilder";
import ISigner from "@modules/signature/interfaces/ISigner";
import {IDocumentSignerRequest} from "@modules/signature/interfaces/dtos/ISignatureRequestsDTO";
import SignatureRepository from "@modules/signature/orm/repository/SignatureRepository";
import ISignatureRepository from "@modules/signature/orm/repository/ISignatureRepository";
import AppError from "@errors/AppError";
import {doc} from "prettier";
import ICustomDocumentSigner from "@modules/signature/interfaces/ICustomDocumentSigner";

@injectable()
export default class SignatureService implements ISignatureService {

  constructor(@inject(SignatureProvider)
              private signatureProvider: ISignatureProvider,
              @inject(delay(SignatureRepository))
              private signatureRepository: ISignatureRepository) {
  }

  async showDocuments(): Promise<IDocument[]> {
    const { documents } = await this.signatureProvider.showDocuments();
    return documents;
  }

  async generateSignature(userId: string): Promise<IDocumentSignerResponse | undefined> {
    if(!await this.signatureRepository.findDocumentSignerByUser(userId)) {
      const { document } = await this.generateDocument();
      const { signer } = await this.generateSigner(userId);
      const documentSignerResponse = await this.associateSignerToDocument(signer, document);
      await this.signatureRepository.createDoc({
        requestSignatureKey: documentSignerResponse.list.request_signature_key,
        userId: userId
      });
      await this.sendSignatureSolicitation({requestSignatureKey: documentSignerResponse.list.request_signature_key});
      return documentSignerResponse;
    }
    return undefined;
  }

  async sendSignatureSolicitation(by: { userId?: string, requestSignatureKey?: string}): Promise<any> {
    let documentSigner;
    if(by.userId) {
      documentSigner = await this.signatureRepository.findDocumentSignerByUser(by.userId);
    } else if (by.requestSignatureKey){
      documentSigner = {requestSignatureKey: by.requestSignatureKey} as ICustomDocumentSigner;
    }
    if(documentSigner) {
      return this.signatureProvider.sendSolicitation({
        request_signature_key: documentSigner.requestSignatureKey
      });
    }
    throw new AppError("signer not found", 404)
  }

  private async associateSignerToDocument(signer: ISigner, document: IDocument): Promise<IDocumentSignerResponse> {
    const documentSignerDTO = {
      list: {
        document_key: document.key,
        signer_key: signer.key,
        sign_as: "sign",
        message: ""
      }
    } as IDocumentSignerRequest
    return this.signatureProvider.addSignerToDocument(documentSignerDTO);
  }

  private async generateSigner(userId: string): Promise<ISignerResponse> {
    const user = await KeycloakAdmin.getUserById(userId);
    const signerDTO = {signer: SignerBuilder.create(user)};
    return this.signatureProvider.createSigner(signerDTO);
  }

  private async generateDocument(page: number = 1): Promise<IDocumentResponse> {
    const documentsResponse = await this.signatureProvider.showDocuments(page);
    const finalizedDocument = documentsResponse.documents.find(document => document.status == "closed");
    if(finalizedDocument) {
      return this.signatureProvider.duplicateDocument(finalizedDocument.key);
    }
    if (page !== documentsResponse.page_infos.total_pages) {
      return this.generateDocument(documentsResponse.page_infos.next_page);
    } else {
      throw new AppError("finalized document not found to duplicate", 404)
    }
  }
}
