import { inject, injectable } from "tsyringe";
import Base64Conversor from "./conversor/Base64Conversor";
import IBase64Conversor from "./conversor/IBase64Conversor";
import DocxParser from "./parser/DocxParser";
import IDocxParser from "./parser/IDocxParser";
import { IKeycloakUser } from "@shared/keycloak/IKeycloakUser";
import IDocumentProcessorService from "./IMinorDocumentProcessorService";


@injectable()
export default class DocumentProcessorService implements IDocumentProcessorService {

    constructor(
        @inject(DocxParser)
        private docxParser: IDocxParser,

        @inject(Base64Conversor)
        private base64Conversor: IBase64Conversor

    ) {

    }


    async execute(user: IKeycloakUser, documentBase64: string): Promise<string> {
        const bufferFile = this.base64Conversor.fromBase64(documentBase64);
        const parsedFile = await this.docxParser.parse({
            buffer: bufferFile,
            variables: {
                responsible_name: user.responsible.name,
                responsible_address: user.responsible.address,
                responsible_cpf: user.responsible.cpf,
                responsible_rg: user.responsible.rg,
                minor_name: user.name,
                minor_document: user.cpf || user.rg
            }
        })
        return this.base64Conversor.toBase64(parsedFile);
    }

}