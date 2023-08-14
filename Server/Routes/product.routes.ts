import { Router } from "express";
import { isAuthorized } from "../middlewares/auth";
import { createProduct, getProducts } from "../Controllers/product.controller";

const router = Router();

router.post("/api/product", /* isAuthorized, */ createProduct)
router.get("/api/products", getProducts)

export default router

