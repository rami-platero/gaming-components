import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const verifyCartToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cart } = req.cookies;
    if (!cart){
        res.locals.cart = []
        return next()
    }

    jwt.verify(
      cart,
      process.env.CART_TOKEN_SECRET!,
      (err: unknown, decoded: any) => {
        if (err) return res.sendStatus(401);

        res.locals.cart = decoded.cart;
        return next();
      }
    );
  } catch (error) {
    return next(error);
  }
};
