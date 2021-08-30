import IDocumentToParse from "./IDocumentToParse";

export default interface IDocumentParserService {
    docxPipeline(parseInfo: IDocumentToParse): Promise<Buffer>
}
