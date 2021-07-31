import IAwsBucketService from "@modules/aws-bucket/service/IAwsBucketService";
import { inject } from "tsyringe";
import AwsTermsRepository from '../repositories/AwsTermsRepository';
import IAwsBucketRepository from '../repositories/IAwsBucketRepository';

export default class AwsBucketService implements IAwsBucketService {
  constructor(
    @inject(AwsTermsRepository)
    private termsRepository: IAwsBucketRepository
  ) { }

  async getObject(objectKey: string): Promise<Buffer> {
    const result = await this.termsRepository.getObject(objectKey);

    const buff = result.Body ? Buffer.from(result.Body as ArrayBuffer) : new Buffer("");
    return Promise.resolve(buff);
  }
}
