import { MessageRepository } from "./repository";
import {
  SendMessageSchemaType,
  GetSupportMessagesQuerySchemaType,
  MarkAsReadSchemaType,
} from "../../dto/message";
import { AppError } from "../../utils/appError";
import { UserRepository } from "../user/repository";

const messageRepository = new MessageRepository();
const userRepository = new UserRepository();

export class MessageService {
  // senderId comes from the auth token because its not safe to trust the client
  // we don't want user/client to be able to specify who they are sending as
  // this would allow impersonation
  async sendMessage(data: SendMessageSchemaType, senderId: string) {
    // checking if receiver exists and is not deleted
    const receiver = await userRepository.findById(data.receiverId);
    if (!receiver || receiver.deletedAt) {
      throw new AppError("Receiver not found", 404);
    }

    // making sure sender is not trying to send a message to themselves
    // NOTE: Should we let users send messages to themselves?
    if (senderId === data.receiverId) {
      throw new AppError("Cannot send message to yourself", 400);
    }

    // if supportId is provided check if that support exists and user has access to it
    if (data.supportId) {
      // TODO: VALIDATE SUPPORT ACCESS
    }

    const message = await messageRepository.create({
      ...data,
      senderId,
    });

    return message;
  }

  async getConversations(userId: string) {
    const conversations = await messageRepository.findConversations(userId);
    return conversations;
  }

  async getMessageById(id: string, userId: string) {
    const message = await messageRepository.findById(id);

    if (!message) {
      throw new AppError("Message not found", 404);
    }

    // checking if user has access to this message
    if (message.senderId !== userId && message.receiverId !== userId) {
      throw new AppError("Access denied", 403);
    }

    return message;
  }

  async markAsRead(data: MarkAsReadSchemaType, userId: string) {
    const result = await messageRepository.markAsRead(data.messageIds, userId);

    if (result.count === 0) {
      throw new AppError("No messages were marked as read", 400);
    }

    return {
      markedCount: result.count,
    };
  }

  async getUnreadCount(userId: string) {
    const count = await messageRepository.getUnreadCount(userId);
    return { unreadCount: count };
  }

  async deleteMessage(id: string, userId: string) {
    const message = await messageRepository.findById(id);

    if (!message) {
      throw new AppError("Message not found", 404);
    }

    // checking if user has access to DELETE this message
    if (message.senderId !== userId && message.receiverId !== userId) {
      throw new AppError("Access denied", 403);
    }

    const result = await messageRepository.delete(id, userId);

    if (result.count === 0) {
      throw new AppError("Message could not be deleted", 400);
    }

    return { success: true };
  }

  async getSupportMessages(
    supportId: string,
    userId: string,
    query: GetSupportMessagesQuerySchemaType
  ) {
    // TODO: Validate support access
    const result = await messageRepository.findSupportMessages(
      supportId,
      userId,
      query.page,
      query.limit
    );
    return result;
  }

  async getConversationWith(
    userId: string,
    partnerId: string,
    limit: number = 20,
    beforeMessageId?: string
  ) {
    // validate that partner exists
    const partner = await userRepository.findById(partnerId);
    if (!partner || partner.deletedAt) {
      throw new AppError("User not found", 404);
    }

    const result = await messageRepository.findConversationMessages(
      userId,
      partnerId,
      limit,
      beforeMessageId
    );

    return result;
  }
}
