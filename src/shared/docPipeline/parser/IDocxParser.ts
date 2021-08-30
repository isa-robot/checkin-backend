import IDocumentToParse from "../IDocumentToParse";

export default interface IDocxParser {
    parse(fileInfo: IDocumentToParse): Promise<Buffer>
}