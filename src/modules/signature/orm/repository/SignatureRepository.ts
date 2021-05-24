import {getRepository} from "typeorm";
import DocumentSignerEntity from "@modules/signature/orm/entities/DocumentSignerEntity";
import AppError from "@errors/AppError";
import ICustomDocumentSigner from "@modules/signature/interfaces/ICustomDocumentSigner";
import ISignatureRepository from "@modules/signature/orm/repository/ISignatureRepository";

export default class SignatureRepository implements ISignatureRepository{
  documentSignRepository: any;

  constructor() {
    this.documentSignRepository = getRepository(DocumentSignerEntity);
  }

  async findDocumentSignerByUser(id: string): Promise<ICustomDocumentSigner | undefined> {
    try {
      return this.documentSignRepository.findOne({
        where: {
          "userId": id
        }
      });
    } catch (e) {
      throw new AppError(e);
    }
  }

  async createDoc(documentSigner: ICustomDocumentSigner): Promise<DocumentSignerEntity | undefined> {
    try {
      return this.documentSignRepository.insert(documentSigner);
    } catch (e) {
      throw new AppError(e);
    }
  }

}
