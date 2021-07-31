export default interface IAwsBucketService {
  getTerm(objectKey: string): Promise<Buffer>;
}
