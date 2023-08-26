import { Router } from "express";
import {
  deleteUser,
  getUser,
  login,
  loginWithGoogle,
  signUp,
  updateUser,
  viewProfile,
} from "../Controllers/user.controller";
import passport from "passport";
import { isAuthorized } from "../middlewares/auth";
import { validateLogin, validateSignUp } from "../middlewares/validate";

const router = Router();

//auth routes

router.post("/api/auth/signup", validateSignUp, signUp);
router.post("/api/auth/login", validateLogin, login);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  loginWithGoogle
);

//user routes

router.get("/api/auth/getUser", getUser);
router.delete("/api/auth/user/:id", deleteUser);
router.put("/api/auth/user/:id", updateUser);
router.get("/profile", isAuthorized, viewProfile);

export default router;
