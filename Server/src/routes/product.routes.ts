import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsWithCategory,
  updateBrand,
} from "../controllers/product.controller";

const router = Router();

router.post("/api/product", /* isAuthenticated, */ createProduct);
router.get("/api/products", getProducts);
router.get("/api/products/:category", getProductsWithCategory);
router.route("/api/products/:id").patch(updateBrand).delete(deleteProduct);

router.get("/api/product/:slug", getProduct);

export default router;
