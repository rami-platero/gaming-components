import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AccessToken } from "../../types";
dotenv.config({ path: __dirname + "/.env" });

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) return res.sendStatus(401); //invalid token
    if (decoded) {
      res.locals.user = (decoded as AccessToken).user;
      return next();
    } else {
      return res.sendStatus(401);
    }
  });
  return;
};
