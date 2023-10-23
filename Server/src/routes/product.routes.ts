import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsWithCategory,
  updateBrand,
} from "../controllers/product.controller";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.post("/api/product", /* isAuthenticated, */upload.array('files', 4), createProduct);
router.get("/api/products", getProducts);
router.get("/api/products/:category", getProductsWithCategory);
router.route("/api/products/:id").patch(updateBrand).delete(deleteProduct);

router.get("/api/product/:slug", getProduct);

export default router;
