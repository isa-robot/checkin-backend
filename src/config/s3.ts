export const s3Config = {
  accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
  secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  bucketName: String(process.env.AWS_BUCKET_NAME),
  defaultRegion: String(process.env.AWS_DEFAULT_REGION)
}
