import DocumentSignerEntity from "@modules/signature/orm/entities/DocumentSignerEntity";
import ICustomDocumentSigner from "@modules/signature/interfaces/ICustomDocumentSigner";

export default interface ISignatureRepository {
  findDocumentSignerByUser(id: string): Promise<ICustomDocumentSigner | undefined>;
  createDoc(documentSigner: ICustomDocumentSigner): Promise<DocumentSignerEntity | undefined>;
}
