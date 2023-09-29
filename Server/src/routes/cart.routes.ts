import { Router } from "express"
import { addItemToCart, clearCart, getCart, removeItemFromCart, updateQuantity } from "../controllers/cart.controller"

const router = Router()

router.route("/api/cart").get(getCart).delete(clearCart)
router.put("/api/cart/update/:id",updateQuantity)
router.route("/api/cart/:id").post(addItemToCart).delete(removeItemFromCart)


export default router