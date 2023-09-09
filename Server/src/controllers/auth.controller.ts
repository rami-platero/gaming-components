import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

import {
  clearCookieLoggedIn,
  clearJWTCookie,
  createAccessToken,
  createJWTCookie,
  createRefreshToken,
  setCookieLoggedIn,
} from "../utils/jwt";
import { loginUser } from "../services/auth.services";
import { RefreshToken } from "./user.controller";

export const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.createQueryBuilder("user")
    .where(":refreshToken = ANY ( string_to_array(user.refreshToken, ','))", {
      refreshToken,
    })
    .getOne();

  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET!,
      async (err: any, decoded: any) => {
        if (err) res.sendStatus(403);

        console.log(decoded);

        let hackedUser = await User.findOne({
          where: {
            id: decoded.id,
          },
        });
        if (hackedUser) {
          hackedUser.refreshToken = [];
        }
        await hackedUser?.save();
      }
    );

    return res.sendStatus(403);
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    async (err: unknown, decoded: unknown) => {
      if (err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }

      if (err || foundUser.id !== (decoded as RefreshToken).id)
        return res.sendStatus(403);

      // Refresh token was still valid
      const accessToken = createAccessToken(foundUser);
      const newRefreshToken = createRefreshToken(foundUser);

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      // Creates Secure Cookie with refresh token
      createJWTCookie(res, newRefreshToken);

      return res.json({ accessToken });
    }
  );

  return;
};

export const handleLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // On client, also delete the accessToken
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({
      where: {
        refreshToken,
      },
    });
    if (!foundUser) {
      clearCookieLoggedIn(res);
      clearJWTCookie(res);
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );
    await foundUser.save();

    clearJWTCookie(res);
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);
    res.locals.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password: pass } = req.body;

  try {
    const user = await User.signUp(username, email, pass);

    // handle jwt tokens / cookies
    const accessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    createJWTCookie(res, newRefreshToken);
    setCookieLoggedIn(res);

    const { password, refreshToken, roles, ...rest } = user;

    return res.status(200).json({ user: { ...rest }, accessToken });
  } catch (error) {
    return next(error);
  }
};

/*   export const loginWithGoogle = async (req: Request, res: Response) => {
    if (req.user && req.user instanceof User) {
      const token = createToken(req.user.id);
      res.cookie("token", token);
    }
    return res.redirect("http://localhost:5173");
  }; */

export const handleJWT = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* const cookies = req.cookies; */
    const user: User = res.locals.user;
    // create JWTs
    const accessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);

    // Saving refreshToken with current user
    user.refreshToken = [...user.refreshToken, newRefreshToken];
    await user.save();

    // Creates Secure Cookie with refresh token
    createJWTCookie(res, newRefreshToken);
    setCookieLoggedIn(res);

    // Send authorization roles and access token to user
    const { refreshToken, password, roles, ...rest } = user;
    return res.json({ accessToken, user: { ...rest } });
  } catch (error) {
    return next(error);
  }
};
