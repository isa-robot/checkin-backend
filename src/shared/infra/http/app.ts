import dotenv from "dotenv";
import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import {string, ValidationError} from "yup";
import cors from "cors";
import "module-alias/register";
import "../typeorm/index";
import "@shared/container/index";
import "@shared/container/providers/index";
import routes from "@routes/index";
import uploadConfig from "@config/upload";
import AppError from "@errors/AppError";
import { container } from "tsyringe";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
const listEndpoints = require('express-list-endpoints');

//@ts-ignore
//import Agendash from "agendash";
import { Job } from "agenda";
//import ILoggerProvider from "@shared/container/providers/LoggerProvider/models/ILoggerProvider";

class App {
  public server: express.Application;



  constructor() {
    dotenv.config({ path: '/home/adriano/Desenvolvimento/ISA-Backend/.env' })
    const { FRONT_URL } = process.env;
    this.server = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
    this.agenda();
    this.endpointsList();
  }

  endpointsList() {
    let endpoints = listEndpoints(this.server);
    console.table(endpoints)
  }

  routes() {
    this.server.use(routes);
  }

  files() {
    this.server.use("/files", express.static(uploadConfig.directory));
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.server.use(bodyParser.json());
    this.server.use(
      cors({
        origin: [String(process.env.FRONT_URL)],
      })
    );
  }

  errorHandling() {
    this.server.use(
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
  agenda() {
    const queue = container.resolve<IQueueProvider>("QueueProvider");
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
    //this.server.use("/admin/jobs", Agendash(queue.getProvider()));
  }
}

export default new App().server;
