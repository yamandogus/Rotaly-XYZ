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

/**
 * @route POST /api/messages/send
 * @desc Send a message (human-to-human or human-to-AI)
 * @access Private
 * @body {
 *   content: string,
 *   receiverId: string (UUID for humans, "ai-assistant" format for AI),
 *   supportId?: string (optional, for support tickets)
 * }
 */
router.post(
  "/send",
  validateBody(SendMessageSchema),
  messageController.sendMessage
);

/**
 * @route GET /api/messages
 * @desc Get messages from a conversation
 * @access Private
 * @query {
 *   receiverId: string (UUID for humans, "ai-assistant" format for AI),
 *   supportId?: string (optional),
 *   page?: number (default: 1),
 *   limit?: number (default: 20, max: 100)
 * }
 */
router.get(
  "/",
  validateQuery(GetMessagesSchema),
  messageController.getMessages
);

/**
 * @route GET /api/messages/conversations
 * @desc Get all user conversations
 * @access Private
 */
router.get("/conversations", messageController.getConversations);

/**
 * @route PUT /api/messages/mark-read
 * @desc Mark messages as read
 * @access Private
 * @body {
 *   messageIds: string[]
 * }
 */
router.put(
  "/mark-read",
  validateBody(MarkAsReadSchema),
  messageController.markAsRead
);

/**
 * @route DELETE /api/messages/:messageId
 * @desc Delete a message (soft delete)
 * @access Private
 */
router.delete("/:messageId", messageController.deleteMessage);

/**
 * @route PUT /api/messages/:messageId
 * @desc Edit a message
 * @access Private
 * @body {
 *   content: string
 * }
 */
router.put(
  "/:messageId",
  validateBody(EditMessageSchema),
  messageController.editMessage
);

export default router;
