import { Router } from "express";
import {
  deleteComment,
  editComment,
  getCommentsFromProduct,
  postComment,
} from "../controllers/comment.controller";
import { isAuthenticated } from "../middlewares/authentication";

const router = Router();

router.get("/api/comments/:id", getCommentsFromProduct);
router.post("/api/comment", /* isAuthorized, */ postComment);
router.delete("/api/comments/:id", isAuthenticated, deleteComment);
router.put("/api/comments/:id", editComment);

export default router;
