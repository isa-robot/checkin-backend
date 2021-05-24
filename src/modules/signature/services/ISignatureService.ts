import IDocument from "@modules/signature/interfaces/IDocument";
import {IDocumentSignerResponse} from "@modules/signature/interfaces/dtos/ISignatureResponsesDTO";

export default interface ISignatureService {
  showDocuments(): Promise<IDocument[]>;
  generateSignature(userId: string): Promise<IDocumentSignerResponse | undefined>;
  sendSignatureSolicitation(by: { userId?: string, requestSignatureKey?: string}): Promise<any>;
}
