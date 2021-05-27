import { createConnection } from 'typeorm';

const postgressConection = async() => {
  const conect = await createConnection({
    "name": "default",
    "type": "postgres",
    "host": String(process.env.DB_HOST),
    "port": Number(process.env.DB_PORT),
    "username": String(process.env.DB_USERNAME),
    "password": String(process.env.DB_PASS),
    "database": String(process.env.DB_DATABASE),
    "entities": [
      __dirname + "/../../../modules/**/infra/typeorm/entities/*.ts",
      __dirname + "/../../../modules/**/**/infra/typeorm/entities/*.ts",
      __dirname + "/../../../modules/**/Entities/*.ts",
      __dirname + "/../../../modules/**/orm/entities/*.ts",
      __dirname + "/../../../shared/container/providers/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [__dirname + "/../../../shared/infra/typeorm/migrations/*.ts"],
    "cli": {
      "migrationsDir": __dirname + "/../../../shared/infra/typeorm/migrations"
    }
  });
}

export default postgressConection
