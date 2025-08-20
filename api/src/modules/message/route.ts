import { Router } from "express";
import { MessageController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { verifiedUser } from "../../middleware/auth.middleware";
import {
  validateBody,
  validateQuery,
} from "../../middleware/validate.middleware";
import {
  SendMessageSchema,
  GetMessagesSchema,
  MarkAsReadSchema,
  EditMessageSchema,
} from "../../dto/message";

const router = Router();
const messageController = new MessageController();

// all message routes require auth and email verification
router.use(authenticateToken);
router.use(verifiedUser);

router.post(
  "/send",
  validateBody(SendMessageSchema),
  messageController.sendMessage
);

router.get(
  "/",
  validateQuery(GetMessagesSchema),
  messageController.getMessages
);

router.get("/conversations", messageController.getConversations);

router.put(
  "/mark-read",
  validateBody(MarkAsReadSchema),
  messageController.markAsRead
);

router.delete("/:messageId", messageController.deleteMessage);

router.put(
  "/:messageId",
  validateBody(EditMessageSchema),
  messageController.editMessage
);

router.get("/ai/status", messageController.checkAIStatus);

export default router;
