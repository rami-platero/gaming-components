import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication";
import { createProduct, getProducts } from "../controllers/product.controller";

const router = Router();

router.post("/api/product", /* isAuthenticated, */ createProduct);
router.get("/api/products", getProducts);

export default router;
