import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {
  clearCookieLoggedIn,
  clearJWTCookie,
  createAccessToken,
  setCookieLoggedIn,
} from "../utils/jwt";
import { deleteFile, getFileURL, uploadFile } from "../utils/s3";
import { AccessToken } from "../../types";
import { AppError } from "../helpers/AppError";
import { comparePasswords } from "../services/auth.services";
dotenv.config({ path: __dirname + "/.env" });
import bcrypt from 'bcrypt'

export const createToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "10y" });
};

export type RefreshToken = {
  id: number;
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jwt: token } = req.cookies;
    if (!token) {
      clearCookieLoggedIn(res);
      return res.sendStatus(403);
    }
    if (token) {
      jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET!,
        async (err: unknown, decoded: unknown) => {
          if (err) {
            // expired
            clearCookieLoggedIn(res);
            clearJWTCookie(res);
            return res.sendStatus(403);
          }

          const user = await User.findOne({
            where: { id: (decoded as RefreshToken).id },
          });
          if (user) {
            const accessToken = createAccessToken(user);
            if (user.avatar) {
              const avatarURL = await getFileURL(user.avatar);
              user.avatar = avatarURL;
            }
            const { password, roles, refreshToken, ...rest } = user;
            // set logged_in cookie in case someone deletes it
            setCookieLoggedIn(res);
            return res.status(200).json({ user: rest, accessToken });
          } else {
            return res.sendStatus(404);
          }
        }
      );
    }
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ error: "User not found" });
    await User.delete({ id: parseInt(id) });
    return res.status(204).json({ message: "Removed user successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.createQueryBuilder()
      .update(User)
      .set(req.body)
      .where("id =:id", { id: req.params.id })
      .returning("*")
      .execute();

    return res.status(200).json({ message: "success", updatedUser });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};

export const viewProfile = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};

export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  const user = res.locals.user as AccessToken["user"];

  if (file) {
    try {
      if (file) {
        if (file.size > 5000000) {
          throw new AppError(
            404,
            JSON.stringify({ message: "File size exceeds 5MB limit!" })
          );
        }
        const foundUser = await User.findOne({ where: { id: user.id } });
        if (!foundUser)
          throw new AppError(
            404,
            JSON.stringify({ message: "User does not exist." })
          );
        if (foundUser.avatar) {
          const result = await deleteFile(foundUser.avatar);
        }
        const result = await uploadFile(file);
        const updatedUser = await User.createQueryBuilder()
          .update(User)
          .where("id=:id", { id: user.id })
          .set({ avatar: result })
          .returning("avatar")
          .execute();

        const data = updatedUser.raw[0];
        const avatarURL = await getFileURL(data.avatar);
        return res.status(200).json({ avatar: avatarURL });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  throw new AppError(
    404,
    JSON.stringify({ message: "No files were provided" })
  );
};

export const getAvatarImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.params.key;
    const result = await getFileURL(key);
    return res.status(200).json({ avatar: result });
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const user = res.locals.user as AccessToken["user"];
    const foundUser = await User.findOne({
      where: {
        id: user.id,
      },
    });
    if (!foundUser) {
      throw new AppError(
        404,
        JSON.stringify({ message: "User does not exist" })
      );
    }

    // user was registered with google
    if (foundUser.password !== null) {
      const match = await comparePasswords(foundUser.password, oldPassword);

      if (!match) {
        throw new AppError(
          400,
          JSON.stringify({ oldPassword: "Invalid password." })
        );
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // change password
    await User.createQueryBuilder("user")
      .update()
      .set({ password: hashedPassword })
      .where("id =:id", { id: foundUser.id })
      .execute();

    return res.status(200).json({ message: "Password changed." });
  } catch (error) {
    return next(error);
  }
};
