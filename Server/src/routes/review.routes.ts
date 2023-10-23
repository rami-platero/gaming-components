import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication";
import { deleteReview, editReview, getReviews, getReviewsFromProduct, postReview } from "../controllers/review.controller";

const router = Router();

/* router.get("/api/reviews/:id", getReviewsFromProduct); */
router.get("/api/reviews/:id", getReviews)
router.post("/api/reviews/:id", isAuthenticated, postReview);
router.delete("/api/reviews/:id", isAuthenticated, deleteReview);
router.put("/api/reviews/:id", isAuthenticated, editReview);

export default router;
