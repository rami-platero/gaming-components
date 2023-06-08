import { Router } from "express";
import { signUp } from "../Controllers/user.controller";

const router = Router()

router.post('/signup',signUp)

export default router