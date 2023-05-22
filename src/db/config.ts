import { Sequelize } from "sequelize-typescript";
import Videos from "../models/Videos";

const connection = new Sequelize({
  dialect: "mysql",
  username: "root",
  password: "triet299",
  database: "youtube",
  host: "127.0.0.1",
  models: [Videos],
});

export default connection;
