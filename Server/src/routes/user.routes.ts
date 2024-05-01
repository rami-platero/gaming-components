import { Router } from "express";
import {
  deleteUser,
  getUser,
  viewProfile,
  updateUser,
  uploadAvatar,
  changePassword,
} from "../controllers/user.controller";
import passport from "passport";
import {
  validateChangePassword,
  validateLogin,
  validateSignUp,
} from "../middlewares/validate";
import {
  handleGoogleJWT,
  handleJWT,
  handleLogin,
  handleLogout,
  handleSignUp,
  refreshToken,
} from "../controllers/auth.controller";
import multer from "multer";
import { isAuthenticated } from "../middlewares/authentication";

const router = Router();

//auth routes

router.post("/api/auth/signup", validateSignUp, handleSignUp, handleJWT);
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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/api/avatar",
  isAuthenticated,
  upload.single("image"),
  uploadAvatar
);
router.patch(
  "/api/auth/changePassword",
  validateChangePassword,
  isAuthenticated,
  changePassword
);

export default router;
