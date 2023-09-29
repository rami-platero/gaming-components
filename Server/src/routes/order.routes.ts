import { Router } from "express";
import { getOrder, getOrders } from "../controllers/orders.controller";
import { isAuthenticated } from "../middlewares/authentication";

const router = Router()

router.get("/api/orders", isAuthenticated, getOrders)
router.get("/api/orders/:id", isAuthenticated, getOrder)

export default router