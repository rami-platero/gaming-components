import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsWithCategory,
  setProductsSpecs,
  updateBrand,
  updateImages,
} from "../controllers/product.controller";
import multer from "multer";
import {
  validateCreateProduct,
  validateGetProduct,
  validateProductsSchema,
} from "../middlewares/validate";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/api/products",
  upload.array("files", 4),
  validateCreateProduct,
  createProduct
);
router.get("/api/products", getProducts);
router.get("/api/products/:category", getProductsWithCategory);
router.route("/api/products/:id").patch(updateBrand).delete(deleteProduct);
router.get("/api/product/:slug", validateGetProduct, getProduct);
router.patch("/api/product/:id/images", updateImages);
router.patch(
  "/api/products/specs/:id",
  validateProductsSchema,
  setProductsSpecs
);

export default router;
