import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication";
import {
  deleteComment,
  editComment,
  getCommentsFromProduct,
  postComment,
} from "../controllers/comment.controller";

const router = Router();

router.get("/api/comments/:id", getCommentsFromProduct);
router.post("/api/comment", /* isAuthorized, */ postComment);
router.delete("/api/comment/:id", isAuthenticated, deleteComment);
router.put("/api/comment/:id", editComment);

export default router;
