import AppError from "@errors/AppError";
import AwsBucketService from "@modules/aws-bucket/service/AwsBucketService";
import IAwsBucketService from "@modules/aws-bucket/service/IAwsBucketService";
import DocumentBuilder from "@modules/signature/builder/DocumentBuilder";
import SignerBuilder from "@modules/signature/builder/SignerBuilder";
import TermTypeEnum from "@modules/signature/enums/TermTypeEnum";
import { ICreateDocumentRequest, IDocumentSignerRequest } from "@modules/signature/interfaces/dtos/ISignatureRequestsDTO";
import {
  IDocumentResponse,
  IDocumentSignerResponse,
  ISignerResponse
} from "@modules/signature/interfaces/dtos/ISignatureResponsesDTO";
import ICustomDocumentSigner from "@modules/signature/interfaces/ICustomDocumentSigner";
import IDocument from "@modules/signature/interfaces/IDocument";
import IDocumentSignHook from "@modules/signature/interfaces/IDocumentSignHook";
import ISigner from "@modules/signature/interfaces/ISigner";
import ISignatureRepository from "@modules/signature/orm/repository/ISignatureRepository";
import SignatureRepository from "@modules/signature/orm/repository/SignatureRepository";
import ISignatureProvider from "@modules/signature/providers/ISignatureProvider";
import SignatureProvider from "@modules/signature/providers/SignatureProvider";
import ISignatureService from "@modules/signature/services/ISignatureService";
import KeycloakAdmin from "@shared/keycloak/keycloak-admin";
import fs from "fs";
import { delay, inject, injectable } from "tsyringe";

@injectable()
export default class SignatureService implements ISignatureService {

  private readonly archivePath = __dirname + '/../uploads';

  constructor(
    @inject(SignatureProvider)
    private signatureProvider: ISignatureProvider,
    @inject(delay(SignatureRepository))
    private signatureRepository: ISignatureRepository,
    @inject(delay(AwsBucketService))
    private awsService: IAwsBucketService
  ) {
  }


  async getDocumentDownloadLink(documentKey: string): Promise<string> {
    try {
      let { downloads } = await this.signatureProvider.findDocument(documentKey)
      return downloads.signed_file_url;

    } catch (e) {
      throw new AppError(e);
    }

  }

  async saveSignature(documentSign: IDocumentSignHook[]): Promise<boolean> {        
    await this.signatureRepository.saveSignatureByKey(documentSign[0].request_signature_key);
    return true;
  }

  async showDocuments(): Promise<IDocument[]> {
    const { documents } = await this.signatureProvider.showDocuments();
    return documents;
  }

  async generateSignature(userId: string, type?: string): Promise<IDocumentSignerResponse | undefined> {
    if (!await this.showDocumentByUser(userId)) {
      const { document } = await this.crateDocument(type || TermTypeEnum.app);
      const { signer } = await this.generateSigner(userId);
      const documentSignerResponse = await this.associateSignerToDocument(signer, document);
      await this.signatureRepository.createDoc({
        requestSignatureKey: documentSignerResponse.list.request_signature_key,
        userId: userId,
        signed: false
      });
      await this.sendSignatureSolicitation({ requestSignatureKey: documentSignerResponse.list.request_signature_key });
      return documentSignerResponse;
    }
    return undefined;
  }

  async findTerm(type?: string): Promise<string> {
    const term = await this.awsService.getTerm(type || TermTypeEnum.app);
    await fs.writeFileSync(this.archivePath + `/${type || TermTypeEnum.app}.txt`, term);
    return fs.readFileSync(this.archivePath + `/${type || TermTypeEnum.app}.txt`, "utf-8");
  }

  async sendSignatureSolicitation(by: { userId?: string, requestSignatureKey?: string }): Promise<any> {
    let documentSigner;
    if (by.userId) {
      documentSigner = await this.signatureRepository.findDocumentSignerByUser(by.userId);
    } else if (by.requestSignatureKey) {
      documentSigner = { requestSignatureKey: by.requestSignatureKey } as ICustomDocumentSigner;
    }
    if (documentSigner) {
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
    const signerDTO = { signer: SignerBuilder.create(user) };
    return this.signatureProvider.createSigner(signerDTO);
  }

  async crateDocument(type: string): Promise<IDocumentResponse> {
    const termBase64 = await this.findTerm(type);
    const term = { document: DocumentBuilder.create(type, termBase64) } as ICreateDocumentRequest;
    return this.signatureProvider.createDocument(term);
  }

  private async generateDocument(page: number = 1): Promise<IDocumentResponse> {
    const documentsResponse = await this.signatureProvider.showDocuments(page);
    const finalizedDocument = documentsResponse.documents.find(document => document.status == "closed");
    if (finalizedDocument) {
      return this.signatureProvider.duplicateDocument(finalizedDocument.key);
    }
    if (page !== documentsResponse.page_infos.total_pages) {
      return this.generateDocument(documentsResponse.page_infos.next_page);
    } else {
      throw new AppError("finalized document not found to duplicate", 404)
    }
  }

  async showDocumentByUser(id: string): Promise<ICustomDocumentSigner | undefined> {
    return this.signatureRepository.findDocumentSignerByUser(id);
  }
}
