import passport from "passport";
import { User } from "../entities/User";
import { GoogleUser } from "../types";
import { Request } from "express";
const GoogleStrategy = require("passport-google-oauth20");
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import { createToken } from "../Controllers/user.controller";

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  
  User.findOneBy({ id })
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async function (
      _request: any,
      _accessToken: any,
      _refreshToken: any,
      profile: GoogleUser,
      done: any
    ) {
      const user = await User.findOneBy({ username: profile.displayName });
      if (!user) {
        const newUser: User = new User();
        newUser.username = profile.displayName;
        newUser.email = profile._json.email;
        await newUser.save();
        return done(null, newUser);
      }
      return done(null, user);
    }
  )
);

const cookieExtractor = function (req: Request) {
  let token: string | null = null;
  if (req && req.cookies) {
    console.log("finding token")
    token = req.cookies["token"];
    console.log("token should be", req.cookies["token"])
  }
  return token;
};

passport.use(
  new JWTStrategy(
    { jwtFromRequest: cookieExtractor, secretOrKey: process.env.JWT_SECRET },
    async (payload: User, done) => {
      try {
        console.log("checking jwt")
        const user = await User.findOne({ where: { id: payload.id } });
        if (user) return done(null, user);
        return done(null, false);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);
