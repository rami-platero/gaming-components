import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Response } from "express";
import { CartItem } from "../types/cart";

export const clearJWTCookie = (res: Response) => {
  return res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

export const createJWTCookie = (res: Response, refreshToken: string) => {
  return res.cookie("jwt", refreshToken, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 31536000000,
  });
};

export const setCookieLoggedIn = (res: Response) => {
  return res.cookie("logged_in", true, {
    httpOnly: false,
    secure: true,
    maxAge: 31536000000,
    sameSite: "none",
  });
};

export const clearCookieLoggedIn = (res: Response) => {
  return res.clearCookie("logged_in", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
};

export const createAccessToken = (user: User) => {
  const accessToken = jwt.sign(
    {
      user: {
        id: user.id,
        roles: user.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );
  return accessToken;
};

export const createRefreshToken = (user: User) => {
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "1y" }
  );
  return refreshToken;
};

export const createCartToken = (cart: CartItem[]) => {
  const formattedCart = cart.map((item)=>{
    return {quantity: item.quantity, id: item.id}
  })
  return jwt.sign( {cart: formattedCart} , process.env.CART_TOKEN_SECRET!, {
    expiresIn: 3600000,
  });
};

export const clearCartCookie = (res: Response) => {
  return res.clearCookie("cart", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
}
