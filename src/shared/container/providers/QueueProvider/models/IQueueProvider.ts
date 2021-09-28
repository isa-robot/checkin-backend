export default interface IQueueProvider {
  registerJobs(): Promise<any>;
  registerJob(name: string, jobFunction: Function): void;
  runJob(name: string, data: Object): Promise<any>;
  every(name: string, at: string): Promise<void>;
  schedule(name: string[], at: string): Promise<void>;
  listen(): Promise<any>;
  getProvider(): any;
  stop(): Promise<any>;  
}
