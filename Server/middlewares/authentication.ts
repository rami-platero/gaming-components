import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../entities/User";
dotenv.config({ path: __dirname + "/.env" });
import { DecodedToken } from "../types";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;
    if (!decodedUser)
      return res.status(401).json({ error: "Not authenticated" });
    const user = await User.findOne({ where: { id: decodedUser.id } });
    if (!user) return res.status(404).json({ error: "User not found!" });
    req.user = user as User;
    return next();
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ error: "Not authenticated" });
  }
};
