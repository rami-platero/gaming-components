import { Router } from "express";
import { isAuthorized } from "../middlewares/auth";
import { deleteComment, editComment, getCommentsFromProduct, postComment } from "../Controllers/comment.controller";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router()

router.get("/api/comments/:id", getCommentsFromProduct)
router.post("/api/comment", /* isAuthorized, */ postComment )
router.delete("/api/comment/:id", isAuthorized, deleteComment)
router.put("/api/comment/:id", editComment)

export default router