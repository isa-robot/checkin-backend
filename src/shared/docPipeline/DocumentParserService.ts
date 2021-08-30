import { injectable, inject } from "tsyringe";
import IDocumentParserService from "./IDocumentParserService";
import IDocumentToParse from "./IDocumentToParse";
import IDocxParser from "./parser/IDocxParser"
import DocxParser from "./parser/DocxParser"
import IDocxToPdfConversor from "./conversor/IDocxToPdfConversor"
import DocxToPdfConversor from "./conversor/DocxToPdfConversor"


@injectable()
export default class DocumentParserService implements IDocumentParserService {

    constructor(
        @inject(DocxParser)
        private docxParser: IDocxParser,

        @inject(DocxToPdfConversor)
        private docxConversor: IDocxToPdfConversor
    ) { }

    async docxPipeline(docToProcess: IDocumentToParse): Promise<Buffer> {        
        const parsedDocx = await this.docxParser.parse(docToProcess)
        const convertedFile = await this.docxConversor.convert(parsedDocx);
        return convertedFile;
    }

}
