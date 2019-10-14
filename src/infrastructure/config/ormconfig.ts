import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3355,
  username: "root",
  password: "example",
  migrationsRun: true,
  database: "awesome-places-dev",
  entities: ["src/domain/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/domain/entities",
    subscribersDir: "src/subscriber/**/*.ts",
  },
};

export = config;
