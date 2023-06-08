import { Request, Response, Router } from "express";
import { signUp } from "../Controllers/user.controller";

const router = Router()

router.get('/users',signUp)

export default router