import { Router } from "express";
import { MessageController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { verifiedUser } from "../../middleware/auth.middleware";
import {
  validateBody,
  validateQuery,
  validateId,
} from "../../middleware/validate.middleware";
import {
  sendMessageSchema,
  getMessagesQuerySchema,
  markAsReadSchema,
} from "../../dto/message";

const router = Router();
const messageController = new MessageController();

// POST /api/messages
// send a new message
router.post(
  "",
  authenticateToken,
  verifiedUser,
  validateBody(sendMessageSchema),
  messageController.sendMessage
);

// GET /api/messages
// get user's messages with pagination and filters
router.get(
  "",
  authenticateToken,
  verifiedUser,
  validateQuery(getMessagesQuerySchema),
  messageController.getMessages
);

// GET /api/messages/conversations
// get all conversations for the user
router.get(
  "/conversations",
  authenticateToken,
  verifiedUser,
  messageController.getConversations
);

// GET /api/messages/unread-count
// get unread messages count to use in notifications
router.get(
  "/unread-count",
  authenticateToken,
  verifiedUser,
  messageController.getUnreadCount
);

// PATCH /api/messages/mark-as-read
// mark messages as read
router.patch(
  "/mark-as-read",
  authenticateToken,
  verifiedUser,
  validateBody(markAsReadSchema),
  messageController.markAsRead
);

// GET /api/messages/support/:supportId
// get messages for a specific support ticket
router.get(
  "/support/:supportId",
  authenticateToken,
  verifiedUser,
  messageController.getSupportMessages
);

// GET /api/messages/conversation/:partnerId
// get conversation with a specific user
router.get(
  "/conversation/:partnerId",
  authenticateToken,
  verifiedUser,
  messageController.getConversationWith
);

// GET /api/messages/:id
// get a specific message by ID
router.get(
  "/:id",
  authenticateToken,
  verifiedUser,
  validateId,
  messageController.getMessageById
);

// DELETE /api/messages/:id
// delete a specific message
router.delete(
  "/:id",
  authenticateToken,
  verifiedUser,
  validateId,
  messageController.deleteMessage
);

export default router;
