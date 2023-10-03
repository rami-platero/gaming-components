import { Router } from "express";
import {
  addItemToCart,
  clearCart,
  getCart,
  removeItemFromCart,
  updateQuantity,
} from "../controllers/cart.controller";
import { verifyCartToken } from "../middlewares/verifyCartToken";

const router = Router();

router
  .route("/api/cart")
  .get(verifyCartToken, getCart)
  .delete(verifyCartToken, clearCart);
router.put("/api/cart/update/:id", verifyCartToken, updateQuantity);
router
  .route("/api/cart/:id")
  .post(verifyCartToken, addItemToCart)
  .delete(verifyCartToken, removeItemFromCart);

export default router;
