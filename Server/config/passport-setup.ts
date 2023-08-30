import passport from "passport";
import { User } from "../entities/User";
import { GoogleUser } from "../types";
const GoogleStrategy = require("passport-google-oauth20");
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

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
