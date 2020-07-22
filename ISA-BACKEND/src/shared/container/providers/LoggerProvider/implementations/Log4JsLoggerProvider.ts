import ILoggerProvider from "../models/ILoggerProvider";
import log4js, { Log4js, Logger } from "log4js";
import loggerConfig from "@config/loggerConfig";

export default class Log4JsLoggerProvider implements ILoggerProvider {
  provider: Log4js;
  logger: Logger;

  constructor() {
    this.provider = log4js.configure(loggerConfig);

    this.logger = this.provider.getLogger();
  }
  public async error(data: any): Promise<void> {
    this.logger.error(data);
  }
  public async success(data: any): Promise<void> {
    this.logger.info(data);
  }

  public getLogger(): Logger {
    return this.logger;
  }
}
