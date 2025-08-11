import { Router } from "express";
import { CommentController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";

const router = Router();

router.get(
  "/hotel/:hotelId",
  authenticateToken,
  CommentController.getHotComments
);
router.post("/", authenticateToken, CommentController.createComment);
router.put("/:id", authenticateToken, CommentController.updateComment);
router.delete("/:id", authenticateToken, CommentController.deleteComment);

export default router;
