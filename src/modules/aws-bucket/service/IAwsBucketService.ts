import Readable from 'node:stream';

export default interface IAwsBucketService {
  getTerm(objectKey: string): Promise<Buffer>;
  getDocument(objectKey: string): Promise<Buffer>
  uploadDocument(object: Readable, key: string): Promise<void>
  listDocuments(): Promise<any>
}
