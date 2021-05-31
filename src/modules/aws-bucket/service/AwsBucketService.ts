import IAwsBucketService from "@modules/aws-bucket/service/IAwsBucketService";
import {S3} from "aws-sdk";
import {s3Config} from "@config/s3";

export default class AwsBucketService implements IAwsBucketService {
  private client: S3;
  private readonly bucketName = s3Config.bucketName;

  constructor() {
    this.client = new S3({
      region: s3Config.defaultRegion,
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey
      },
    })
  }

  async getObject(objectKey: string): Promise<Buffer> {
    const result = await this.client.getObject({
      Bucket: this.bucketName,
      Key: objectKey
    }).promise();
    const buff = result.Body ? Buffer.from(result.Body as ArrayBuffer) : new Buffer("");
    return Promise.resolve(buff);
  }
}
