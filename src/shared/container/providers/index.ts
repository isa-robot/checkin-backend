import { container } from "tsyringe";

import IQueueProvider from "./QueueProvider/models/IQueueProvider";
import AgendaQueueProvider from "./QueueProvider/implementations/AgendaQueueProvider";
import ISmsProvider from "./SmsProvider/models/ISmsProvider";
import ZenviaSmsProvider from "./SmsProvider/implementations/ZenviaSmsProvider";
import ILoggerProvider from "./LoggerProvider/models/ILoggerProvider";
import Log4JsLoggerProvider from "./LoggerProvider/implementations/Log4JsLoggerProvider";


container.registerSingleton<IQueueProvider>(
  "QueueProvider",
  AgendaQueueProvider
);

container.registerSingleton<ISmsProvider>("SmsProvider", ZenviaSmsProvider);

container.registerSingleton<ILoggerProvider>(
  "LoggerProvider",
  Log4JsLoggerProvider
);
