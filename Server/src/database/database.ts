import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import * as dotenv from "dotenv";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { Review } from "../entities/Review";
dotenv.config({ path: __dirname + "/.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_NAME,
  entities: [User, Review, Product, Order, OrderItem],
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
