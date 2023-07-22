import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./Routes/user.routes";
import passport from "passport";
import session from "express-session";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const PassportSetup = require('./config/passport-setup')

const app = express();
app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:5173");

  // Allow credentials to be sent
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Other headers and options
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});
app.use(express.json());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session())


app.use("/", router);

export default app;
