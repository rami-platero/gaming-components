import { Router } from "express";
import { deleteUser, getGoogleUser, login, signUp } from "../Controllers/user.controller";
import passport from "passport";
import { Request, Response } from "express";

const router = Router();

router.get("/auth/getGoogleUser", getGoogleUser)
router.post("/auth/signup", signUp);
router.post("/auth/login", login);
router.get("/auth/logout", logout)
router.delete("/auth/user/:id", deleteUser)
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(_req, res) {
  res.redirect('http://localhost:5173');
});

export default router;
