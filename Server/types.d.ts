import { Session, SessionData } from "express-session";
import { CartItem } from "./src/types/cart";
import session from 'express-session';

interface ExtendedSession extends Session {
  cart: CartItem[]
}

export interface GoogleUser {
  id: string;
  displayName: string;
  name: Name;
  emails: Email[];
  photos: Photo[];
  provider: string;
  _raw: string;
  _json: JSON;
}

export interface JSON {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface Email {
  value: string;
  verified: boolean;
}

export interface Name {
  givenName: string;
}

export interface Photo {
  value: string;
}

export interface DecodedToken {
  user: {
    username: string;
    roles: Roles[];
  };
  iat: number;
  exp: number;
}

interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: Category;
  description: string;
  price: number;
  stock: number;
  brand: string;
  main_image: ProductImage;
  images: ProductImage[];
  stripe_price: string
  createdAt: Date;
  updatedAt: Date;
};

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      username: string;
      roles: string[];
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    cart: CartItem[];
  }
}

export type AccessToken = {
  user: {
    id: number;
    roles: string[];
  };
};
