"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const postgressConection = async () => {
  const connect = await typeorm_1.createConnection({
    "name": "default",
    "type": "postgres",
    "host": String(process.env.DB_HOST),
    "port": Number(process.env.DB_PORT),
    "username": String(process.env.DB_USERNAME),
    "password": String(process.env.DB_PASS),
    "database": String(process.env.DB_DATABASE),
    "entities": [
      __dirname + "/../../../modules/**/infra/typeorm/entities/*.js",
      __dirname + "/../../../modules/**/**/infra/typeorm/entities/*.js",
      __dirname + "/../../../modules/**/Entities/*.js",
      __dirname + "/../../../modules/**/**/Entities/*.js",
      __dirname + "/../../../modules/**/**/entities/*.js",
      __dirname + "/../../../shared/container/providers/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [__dirname + "/../../../shared/infra/typeorm/migrations/*.js"],
    "cli": {
      "migrationsDir": __dirname + "/../../../shared/infra/typeorm/migrations"
    }
  });
}

exports.default = postgressConection;
