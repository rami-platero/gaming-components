import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import commentRouter from "./routes/comment.routes";
import passport from "passport";
import session from "express-session";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const PassportSetup = require("./config/passport-setup");
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);
console.log("NODE ENV",process.env.NODE_ENV);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router, productRouter, commentRouter);
app.use(errorHandler);

export default app;
