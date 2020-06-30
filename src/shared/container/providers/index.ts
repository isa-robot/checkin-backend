import { container } from "tsyringe";

import mailConfig from "@config/mail";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtheralMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";
import IQueueProvider from "./QueueProvider/models/IQueueProvider";
import AgendaQueueProvider from "./QueueProvider/implementations/AgendaQueueProvider";
import SESMailProvider from "./MailProvider/implementations/SESMailProvider";
import ISmsProvider from "./SmsProvider/models/ISmsProvider";
import ZenviaSmsProvider from "./SmsProvider/implementations/ZenviaSmsProvider";
import ILoggerProvider from "./LoggerProvider/models/ILoggerProvider";
import Log4JsLoggerProvider from "./LoggerProvider/implementations/Log4JsLoggerProvider";

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailConfig.driver === "ethereal"
    ? container.resolve(EtheralMailProvider)
    : container.resolve(SESMailProvider)
);

container.registerSingleton<IQueueProvider>(
  "QueueProvider",
  AgendaQueueProvider
);

container.registerSingleton<ISmsProvider>("SmsProvider", ZenviaSmsProvider);

container.registerSingleton<ILoggerProvider>(
  "LoggerProvider",
  Log4JsLoggerProvider
);
