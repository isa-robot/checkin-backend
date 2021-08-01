import AwsBucketService from "@modules/aws-bucket/service/AwsBucketService";
import IAwsBucketService from "@modules/aws-bucket/service/IAwsBucketService";
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import FileDownloadService from "@shared/services/FileDownladerService";
import IFileDownloadService from "@shared/services/IFileDownloadService";
import { delay, inject, injectable } from "tsyringe";
import IBackupDocumentService from "./IBackupDocumentService";
import ISignatureService from './ISignatureService';
import SignatureService from './SignatureService';
import ILoggerProvider from "@shared/container/providers/LoggerProvider/models/ILoggerProvider"

@injectable()
export default class BackupDocumentService implements IBackupDocumentService {

  constructor(
    @inject("LoggerProvider")
    private logger: ILoggerProvider,

    @inject("QueueProvider")
    private queueProvider: IQueueProvider,

    @inject(SignatureService)
    private signatureService: ISignatureService,

    @inject(FileDownloadService)
    private fileDownloadService: IFileDownloadService,

    @inject(delay(AwsBucketService))
    private awsService: IAwsBucketService
  ) {
    queueProvider.registerJob("BackupDocument", this.execute.bind(this))
  }

  async execute(job: any): Promise<void> {
    let documentKey = job.attrs.data;
    try {      
      let downloadUrl = await this.signatureService.getDocumentDownloadLink(documentKey);
      let file = await this.fileDownloadService.download(downloadUrl);      

      await this.awsService.uploadDocument(file, documentKey)
      console.info(`Successfully backed up file. Key: ${documentKey}`);                        
    } catch (e) {      
      console.error(`File backup error. Key: ${documentKey}`)
      console.log(e.message || e)
    }
  }

  scheduleBackup(documentKey: string) {
    this.queueProvider.runJob("BackupDocument", documentKey)    
  }


}
