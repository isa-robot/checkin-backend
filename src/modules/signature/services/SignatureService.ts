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
import IResponsibleService from "@users/responsible/service/IResponsibleService";
import ResponsibleService from "@users/responsible/service/ResponsibleService";
import IMinorDocumentProcessorService from "../processors/IMinorDocumentProcessorService";
import MinorDocumentProcessorService from "../processors/MinorDocumentProcessorService";
import StudentBaselines from "@users/studentBaselines/infra/typeorm/entities/StudentBaselines";
import ShowStudentBaseline from "@users/studentBaselines/services/ShowStudentBaseline";
import EmployeeDocumentProcessor from "@modules/signature/processors/EmployeeDocumentProcessor";
import IDocumentProcessorService from "@modules/signature/processors/IDocumentProcessorService";
import LegalAgeDocumentProcessor from "@modules/signature/processors/LegalAgeDocumentProcessor";

@injectable()
export default class SignatureService implements ISignatureService {

  private readonly archivePath = __dirname + '/../uploads';

  constructor(
    @inject(SignatureProvider)
    private signatureProvider: ISignatureProvider,
    @inject(delay(MinorDocumentProcessorService))
    private minorDocumentProcessorService: IMinorDocumentProcessorService,
    @inject(delay(EmployeeDocumentProcessor))
    private employeeDocumentProcessor: IDocumentProcessorService,
    @inject(delay(LegalAgeDocumentProcessor))
    private legalAgeDocumentProcessor: IDocumentProcessorService,
    @inject(delay(SignatureRepository))
    private signatureRepository: ISignatureRepository,
    @inject(delay(AwsBucketService))
    private awsService: IAwsBucketService,
    @inject(delay(ShowStudentBaseline))
    private showStudentBaseline: ShowStudentBaseline,
    @inject(delay(ResponsibleService))
    private responsibleService: IResponsibleService
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
      const { document } = await this.createDocument(userId);
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
    throw new AppError("User already have a document to sign");
  }

  async findTerm(type: string): Promise<string> {
    const term = await this.awsService.getTerm(type);
    await fs.writeFileSync(this.archivePath + `/${type}.docx`, term);
    return fs.readFileSync(this.archivePath + `/${type}.docx`, "binary");
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
    const userRoles = await KeycloakAdmin.getRoleFromUser(userId);
    if(userRoles.some((role: any) => role.name === "student")) {
      const studentBaselines = await this.showStudentBaseline.execute(userId);
      if (studentBaselines.baseline.age < 18) {
        const responsible = await this.responsibleService.findUserResponsible(userId);
        return this.signatureProvider.createSigner({signer: SignerBuilder.create(responsible)});
      }
    }
    const user = await KeycloakAdmin.getUserById(userId);
    return this.signatureProvider.createSigner({signer: SignerBuilder.create(user)});
  }

  async createDocument(userId: string): Promise<IDocumentResponse> {
    let termBase64;
    let type;
    const user = await KeycloakAdmin.getUserById(userId);
    const userRoles = await KeycloakAdmin.getRoleFromUser(userId);
    if(userRoles.some((role: any) => role.name === "student")) {
      const studentBaselines = await this.showStudentBaseline.execute(userId);
      if(studentBaselines.baseline.age < 18) {
        type = TermTypeEnum.minor;
        const responsible = await this.responsibleService.findUserResponsible(userId);
        termBase64 = await this.findTerm(type);
        termBase64 = await this.minorDocumentProcessorService.execute(termBase64, {user, responsible});
      } else {
        type = TermTypeEnum.legalAge;
        termBase64 = await this.findTerm(type);
        termBase64 = await this.legalAgeDocumentProcessor.execute(termBase64);
      }
    } else {
      type = TermTypeEnum.employee;
      termBase64 = await this.findTerm(TermTypeEnum.employee);
      termBase64 = await this.employeeDocumentProcessor.execute(termBase64);
    }
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
