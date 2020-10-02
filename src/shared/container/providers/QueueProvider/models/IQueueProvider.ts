export default interface IQueueProvider {
  registerJobs(): Promise<any>;
  runJob(name: string, data: Object): Promise<any>;
  every(name: string, at: string): Promise<void>;
  schedule(name: string[], at: string): Promise<void>;
  listen(): Promise<any>;
  getProvider(): any;
  stop(): Promise<any>;
}
