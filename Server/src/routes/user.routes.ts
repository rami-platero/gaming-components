import { Router } from "express";
import {
  deleteUser,
  getUser,
  viewProfile,
  updateUser,
} from "../controllers/user.controller";
import passport from "passport";
import { validateLogin, validateSignUp } from "../middlewares/validate";
import {
  handleGoogleJWT,
  handleJWT,
  handleLogin,
  handleLogout,
  handleSignUp,
  refreshToken,
} from "../controllers/auth.controller";

const router = Router();

//auth routes

router.post("/api/auth/signup", validateSignUp, handleSignUp);
router.post("/api/auth/login", validateLogin, handleLogin, handleJWT);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  handleGoogleJWT
);
router.get("/api/auth/refresh", refreshToken);
router.post("/api/auth/logout", handleLogout);

//user routes

router.get("/api/auth/getUser", getUser);
router.delete("/api/auth/user/:id", deleteUser);
router.put("/api/auth/user/:id", updateUser);
router.get("/profile", viewProfile);

export default router;
