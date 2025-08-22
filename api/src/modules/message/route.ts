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

// get the socket controller from global (if available)
let messageController: MessageController;
console.log(
  `Global socketController available: ${!!(global as any).socketController}`
);

if ((global as any).socketController) {
  console.log(`🔧 Creating MessageController with socket handler`);
  const messageHandler = (global as any).socketController.getMessageHandler();
  messageController = new MessageController(messageHandler);
} else {
  console.log(
    `Creating MessageController without socket handler - real-time features may not work`
  );
  // fallback for cases where socket controller is not available
  messageController = new MessageController();
}

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
