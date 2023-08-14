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

const router = Router();

//auth routes

router.post("/auth/signup", signUp);
router.post("/auth/login", login);
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

router.get("/api/getUser", getUser);
router.delete("/api/user/:id", deleteUser);
router.put("/api/user/:id", updateUser)
router.get("/profile", isAuthorized, viewProfile);

export default router;
