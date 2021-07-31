import { s3Config, documentsBucket } from "@config/s3";
import AwsBucketRepository from "./AwsBucketRepository";

export default class AwsDocumentsRepository extends AwsBucketRepository {
    constructor() {
        super(s3Config, documentsBucket.Bucket);
    }
}