import express, { NextFunction, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import commentRouter from "./routes/comment.routes";
import cartRouter from "./routes/cart.routes";
import paymentRouter from "./routes/payment.routes";
import orderRouter from "./routes/order.routes";
import passport from "passport";
import session from "express-session";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const PassportSetup = require("../config/passport-setup");
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

app.use((req, res, next) => {
  if (req.originalUrl === "/api/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET_CODE!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
      /* sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true, */
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, _res, next: NextFunction) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

app.use(
  "/",
  router,
  productRouter,
  commentRouter,
  cartRouter,
  paymentRouter,
  orderRouter
);
app.use(errorHandler);

export default app;
