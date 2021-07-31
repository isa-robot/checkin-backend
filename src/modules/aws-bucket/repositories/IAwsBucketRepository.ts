import { S3 } from "aws-sdk";
import Readable from 'node:stream';
import { ManagedUpload } from "aws-sdk/clients/s3";


export default interface IAwsBucketRepository {
    getObject(objectKey: string): Promise<S3.Types.GetObjectOutput>;
    upload(object: Readable, key: string): Promise<ManagedUpload.SendData>

}