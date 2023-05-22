import { Sequelize } from "sequelize-typescript";
import Videos from "../models/Videos";
import * as dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_SCHEMA as string;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = "mysql";

const connection = new Sequelize({
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  host: process.env.DB_HOST,
  models: [Videos],
});

// const dbName = "youtube";
// const dbHost = "127.0.0.1";
// const dbUsername = "root";
// const dbPassword = "triet299";
// const dbDialect = "mysql";

// const connection = new Sequelize(dbName, dbUsername, dbPassword, {
//   host: dbHost,
//   dialect: dbDialect,
// });

export default connection;
