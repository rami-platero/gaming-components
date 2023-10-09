import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication";
import { deleteReview, editReview, getReviewsFromProduct, postReview } from "../controllers/review.controller";

const router = Router();

router.get("/api/reviews/:id", getReviewsFromProduct);
router.post("/api/review", /* isAuthorized, */ postReview);
router.delete("/api/reviews/:id", isAuthenticated, deleteReview);
router.put("/api/reviews/:id", editReview);

export default router;
