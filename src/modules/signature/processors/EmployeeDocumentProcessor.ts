import { inject, injectable } from "tsyringe";
import Base64Conversor from "./conversor/Base64Conversor";
import IBase64Conversor from "./conversor/IBase64Conversor";
import DocxParser from "./parser/DocxParser";
import IDocxParser from "./parser/IDocxParser";
import IMinorDocumentProcessorService from "./IMinorDocumentProcessorService";

@injectable()
export default class EmployeeDocumentProcessor implements IMinorDocumentProcessorService {

    constructor(@inject(DocxParser)
        private docxParser: IDocxParser,
        @inject(Base64Conversor)
        private base64Conversor: IBase64Conversor) {}

    async execute(documentDocx: string, data:{} = {}): Promise<string> {
      const parsedFile = await this.docxParser.parse({
        buffer: documentDocx,
        variables: null
      })
      return this.base64Conversor.toWordBase64(parsedFile);
    }

}
