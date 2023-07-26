import { Router } from "express";
import {
  createToken,
  deleteUser,
  getUser,
  login,
  signUp,
  viewProfile,
} from "../Controllers/user.controller";
import passport from "passport";
import { isAuthorized } from "../middlewares/auth";
import { User } from "../entities/User";

const router = Router();

router.get("/auth/getUser", getUser);
router.post("/auth/signup", signUp);
router.post("/auth/login", login);
router.delete("/auth/user/:id", deleteUser);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    if(req.user && req.user instanceof User){
      console.log("creating token")
      const token = createToken(req.user.id);
      res.cookie("token", token);
    }
    return res.redirect("http://localhost:5173");
  }
);
router.get("/profile", isAuthorized, viewProfile);

export default router;
