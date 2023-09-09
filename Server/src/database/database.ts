import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";
import { Product } from "../entities/Product";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_NAME,
  entities: [User, Comment, Product],
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
