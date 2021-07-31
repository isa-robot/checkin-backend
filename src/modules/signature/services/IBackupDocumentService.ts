
export default interface IBackupDocumentService {
  execute(url: string): Promise<void>;  
  scheduleBackup(documentKey: string): void;  
}
