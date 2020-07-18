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
    "src/modules/**/infra/typeorm/entities/*.ts",
    "src/modules/**/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": ["src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "src/shared/infra/typeorm/migrations"
  }
});
