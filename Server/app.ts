import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./Routes/user.routes";
import productRouter from './Routes/product.routes'
import passport from "passport";
import session from "express-session";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const PassportSetup = require('./config/passport-setup')
import cookieParser from 'cookie-parser'

const app = express();
app.use(morgan("dev"));
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
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
app.use(passport.session())


app.use("/", router,productRouter);

export default app;
