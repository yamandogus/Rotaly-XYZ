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
  getSupportMessagesQuerySchema,
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
// I've removed this generic endpoint and implemented these endpoints instead:
// - For chat messages: /api/messages/conversation/:partnerId - get conversation messages with a specific user
// - For support messages: /api/messages/support/:supportId - get messages for a specific support ticket

// GET /api/messages/conversations
// get all conversations for the user
// NOTE: I might get rid of this
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
// get messages for a specific support ticket with pagination (traditional pagination)
// examples:
// /api/messages/support/uuid?page=1&limit=10
// TODO: CHANGE THIS TO MESSAGE A SUPPORT PERSONNEL NOT A TICKET
// NOTE: /
router.get(
  "/support/:supportId",
  authenticateToken,
  verifiedUser,
  validateQuery(getSupportMessagesQuerySchema),
  messageController.getSupportMessages
);

// GET /api/messages/conversation/:partnerId
// get conversation with a specific user (cursor-based pagination)
// examples:
// /api/messages/conversation/uuid?limit=20
// /api/messages/conversation/uuid?limit=20&beforeMessageId=messageId
// TODO: conversation with Rotaly XYZ chatbot
// NOTE: /ai-assistant/:conversationId
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

// message edit route

export default router;
