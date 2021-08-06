import { s3Config, termsBucket } from "@config/s3";
import AwsBucketRepository from "./AwsBucketRepository";
import { injectable } from 'tsyringe';

@injectable()
export default class AwsTermsRepository extends AwsBucketRepository {
    constructor() {
        super(s3Config, termsBucket.Bucket);
    }
}