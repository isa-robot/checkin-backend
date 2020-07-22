export default interface ILoggerProvider {
  error(data: any): Promise<void>;
  success(data: any): Promise<void>;
  getLogger(): any;
}
