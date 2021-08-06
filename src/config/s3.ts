export const s3Config = {
  accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
  secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  defaultRegion: String(process.env.AWS_DEFAULT_REGION)
}


export const termsBucket = {
  Bucket: String(process.env.AWS_TERMS_BUCKET_NAME),  
}

export const documentsBucket = {
  Bucket: String(process.env.AWS_DOCUMENTS_BUCKET_NAME),  
}