import { createConnection } from 'typeorm';

createConnection({
  "name": "default",
  "type": "postgres",
  "host": String(process.env.DB_HOST),
  "port": Number(process.env.DB_PORT),
  "username": String(process.env.DB_USERNAME),
  "password": String(process.env.DB_PASS),
  "database": String(process.env.DB_DATABASE),
  "entities": [
    "modules/**/infra/typeorm/entities/*.ts",
    "modules/**/**/infra/typeorm/entities/*.ts",
    "shared/container/providers/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": ["shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "shared/infra/typeorm/migrations"
  }
});
