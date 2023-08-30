import { Router } from "express";
import {
  deleteUser,
  getUser,
  login,
  loginWithGoogle,
  signUp,
  updateUser,
  viewProfile,
} from "../controllers/user.controller";
import passport from "passport";
import { isAuthenticated } from "../middlewares/authentication";
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
router.get("/profile", isAuthenticated, viewProfile);

export default router;
