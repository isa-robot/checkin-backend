export default interface IDocumentProcessorService {
  execute(documentBase64: string, data?: any): Promise<string>
}
