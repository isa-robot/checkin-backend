import { inject, injectable } from "tsyringe";
import Base64Conversor from "./conversor/Base64Conversor";
import IBase64Conversor from "./conversor/IBase64Conversor";
import DocxParser from "./parser/DocxParser";
import IDocxParser from "./parser/IDocxParser";
import { IKeycloakUser } from "@shared/keycloak/IKeycloakUser";
import IMinorDocumentProcessorService from "./IMinorDocumentProcessorService";
import IResponsible from "@users/responsible/interfaces/IResponsible";

@injectable()
export default class MinorDocumentProcessorService implements IMinorDocumentProcessorService {

    constructor(@inject(DocxParser)
        private docxParser: IDocxParser,
        @inject(Base64Conversor)
        private base64Conversor: IBase64Conversor) {}

    async execute(documentDocx: string,data:{user: IKeycloakUser, responsible: IResponsible}): Promise<string> {
      const parsedFile = await this.docxParser.parse({
        buffer: documentDocx,
        variables: {
            responsible_name: data.responsible.name,
            responsible_address: data.responsible.address,
            responsible_cpf: data.responsible.cpf,
            responsible_rg: data.responsible.rg,
            minor_name: data.user.firstName + " " + data.user.lastName
        }
      })
      return this.base64Conversor.toWordBase64(parsedFile);
    }

}
