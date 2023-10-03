import { Router } from "express";
import {
  deleteUser,
  getUser,
  viewProfile,
  updateUser,
  uploadAvatar,
  getAvatarImage,
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
import { uploadFile } from "../utils/s3";
import multer from "multer";
import { isAuthenticated } from "../middlewares/authentication";

const router = Router();

//auth routes

router.post("/api/auth/signup", validateSignUp, handleSignUp);
router.post("/api/auth/login", validateLogin, handleLogin, handleJWT);
router.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  handleGoogleJWT
);
router.get("/api/auth/refresh", refreshToken);
router.post("/api/auth/logout", handleLogout);

//user routes

const upload = multer({ dest: "uploads/" });

router.get("/api/auth/getUser", getUser);
router.delete("/api/auth/user/:id", deleteUser);
router.put("/api/auth/user/:id", updateUser);
router.get("/profile", viewProfile);
router.post(
  "/api/avatar",
  isAuthenticated,
  upload.single("image"),
  uploadAvatar
);
router.get("/api/avatar/:key", getAvatarImage);

export default router;
