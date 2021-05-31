export default interface IAwsBucketService {
  getObject(objectKey: string): Promise<Buffer>;
}
