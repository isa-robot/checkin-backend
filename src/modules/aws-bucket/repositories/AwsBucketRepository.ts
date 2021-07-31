import { S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import Readable from "node:stream";
import IAwsBucketRepository from "./IAwsBucketRepository";

export default abstract class AwsBucketRepository implements IAwsBucketRepository{
    private client: S3;
    private bucketName: string;

    constructor(s3Config: any, bucketName: string) {
        this.client = new S3({
            region: s3Config.defaultRegion,
            credentials: {
                accessKeyId: s3Config.accessKeyId,
                secretAccessKey: s3Config.secretAccessKey
            },
        })
        this.bucketName = bucketName;
    }

    async getObject(objectKey: string): Promise<S3.Types.GetObjectOutput> {
        return await this.client.getObject({
            Bucket: this.bucketName,
            Key: objectKey
        }).promise();
    }

    async upload(object: Readable, key: string): Promise<ManagedUpload.SendData> {
        return await this.client.upload({
            Bucket: this.bucketName,
            Key: key,
            Body: object
        }).promise();
    }

}