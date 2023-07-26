import { Router } from "express";
import { isAuthorized } from "../middlewares/auth";
import { createProduct } from "../Controllers/product.controller";

const router = Router();

router.post("/api/newProduct", /* isAuthorized, */ createProduct)

export default router

