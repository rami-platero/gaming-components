import { Router } from "express";
import {
  createCheckoutSession,
  getCheckoutSession,
  getOrderID,
  stripeWebhook,
} from "../controllers/payment.controller";
import { createStripeProducts } from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/authentication";
import express from "express";

const router = Router();

router.post(
  "/api/create-checkout-session",
  isAuthenticated,
  createCheckoutSession
);
router.post("/api/createStripeProducts", createStripeProducts);
router.get("/api/checkout-session/:session_id", getCheckoutSession)
router.get("/api/checkout-session/order/:session_id", getOrderID)
router.post("/api/webhook", express.raw({ type: "*/*" }), stripeWebhook);

export default router;
