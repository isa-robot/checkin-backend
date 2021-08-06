import IAwsBucketService from "@modules/aws-bucket/service/IAwsBucketService";
import { inject, injectable } from "tsyringe";
import AwsDocumentsRepository from '../repositories/AwsDocumentsRepository';
import AwsTermsRepository from '../repositories/AwsTermsRepository';
import IAwsBucketRepository from '../repositories/IAwsBucketRepository';
import Readable from 'node:stream';

@injectable()
export default class AwsBucketService implements IAwsBucketService {
  constructor(
    @inject(AwsTermsRepository)
    private termsRepository: IAwsBucketRepository,
    @inject(AwsDocumentsRepository)
    private documentsRepository: IAwsBucketRepository,
  ) { }

  async getTerm(objectKey: string): Promise<Buffer> {
    const result = await this.termsRepository.getObject(objectKey);

    const buff = result.Body ? Buffer.from(result.Body as ArrayBuffer) : new Buffer("");
    return Promise.resolve(buff);
  }

  async getDocument(objectKey: string): Promise<Buffer> {
    const result = await this.documentsRepository.getObject(objectKey);

    const buff = result.Body ? Buffer.from(result.Body as ArrayBuffer) : new Buffer("");
    return Promise.resolve(buff);
  }

  async uploadDocument(object: Readable, key: string): Promise<void> {
    try {
      await this.documentsRepository.upload(object, key);      
    } catch (e) {
      throw e;
    }
  }
}
