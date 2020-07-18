import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import cors from 'cors'
import "express-async-errors";
import bodyParser from "body-parser";
import {string, ValidationError} from "yup";
import "module-alias/register";
import "../typeorm/index";
import "@shared/container/index";
import "@shared/container/providers/index";
import routes from "@routes/index";
import uploadConfig from "@config/upload";
import AppError from "@errors/AppError";
import { container } from "tsyringe";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import KeycloakConnect from '@shared/keycloak/keycloak-config'
import initMailer from '@messages/initMailer'

import { Job } from "agenda";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    initMailer()
    const { FRONT_URL } = process.env;
    this.middlewares();
    this.KeycloakConnect()
    this.routes();
    this.errorHandling()
    this.agenda();
  }

  KeycloakConnect(){
    const keycloak = KeycloakConnect.getKeycloak()
    this.express.use(keycloak.middleware())
  }

  routes() {
    this.express.use(routes);
  }

  files() {
    this.express.use("/files", express.static(uploadConfig.directory));
  }

  middlewares() {
    this.express.use(cors())
    this.express.use(express.json());
    this.express.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.express.use(bodyParser.json());
  }

  agenda() {
    const queue = container.resolve<IQueueProvider>("QueueProvider");
    setTimeout(()=> {
      queue.listen().then(() => {
        queue.every("ScheduleJobsAt", "1 days");
      });

      queue.getProvider().on('fail', (err: Error, job: Job) => {
        queue.runJob("SendMailJobError", {
          to: {
            address: "suporte@portalqualis.com.br",
            name: "Suporte Qualis",
          },
          from: {
            address: "admin@portalqualis.com.br",
            name: "Qualis",
          },
          data: { name: err.name, message: err.message, job: job.attrs.name },
        })
      });
    }, 1000)
    //this.express.use("/admin/jobs", Agendash(queue.getProvider()));
  }

  errorHandling() {
    this.express.use(
      async (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        //const logger = container.resolve<ILoggerProvider>("LoggerProvider");

        if (err instanceof AppError) {
          //logger.error({ status: err.statusCode, message: err.message });
          return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }

        if (err instanceof ValidationError) {
          //logger.error({ status: 400, message: err.errors });
          return response.status(400).json({
            status: "error",
            message: err.errors,
          });
        }

        if (process.env.NODE_ENV !== "production") {
          //logger.error({ status: 500, message: err.message });
          return response.status(500).json({
            status: "error",
            message: err.message,
          });
        }

        const queue = container.resolve<IQueueProvider>("QueueProvider");
        queue.runJob("SendMailError", {
          to: {
            address: "suporte@portalqualis.com.br",
            name: "Suporte Qualis",
          },
          from: {
            address: "admin@portalqualis.com.br",
            name: "Qualis",
          },
          data: { name: err.name, message: err.message },
        })

        //logger.error({ status: 500, message: err.message });
        return response.status(500).json({
          status: "error",
          message: "Erro interno do servidor",
        });
      }
    );
  }
}

export default new App().express;
