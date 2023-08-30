import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./Database/database";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("connected to db");
    app.listen(process.env.PORT || 4000, () => {
      console.log("listening on port", process.env.PORT);
    });
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
}

main();
