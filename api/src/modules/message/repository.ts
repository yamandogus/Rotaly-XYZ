import { PrismaClient } from "@prisma/client";
import {
  SendMessageDto,
  GetMessagesDto,
  EditMessageDto,
} from "../../dto/message";

export class MessageRepository {
  constructor(private prisma: PrismaClient) {}

  async ensureAIUserExists(aiId: string) {
    // check if AI user already exists
    let aiUser = await this.prisma.user.findFirst({
      where: {
        email: `${aiId}@ai`,
      },
    });

    if (!aiUser) {
      // create AI user if it doesn't exist
      aiUser = await this.prisma.user.create({
        data: {
          id: aiId, // use the AI ID as the user ID
          name: "AI",
          surname: "Assistant",
          email: `${aiId}@ai`,
          phone: `+1-AI-${aiId.replace("ai", "")}`,
          isVerified: true,
          role: "SUPPORT", // NOTE: might create a special AI role if needed
        },
      });
    }

    return aiUser;
  }

  async sendMessage(senderId: string, data: SendMessageDto) {
    // for AI messages, we need to handle the receiver differently
    // since the schema requires receiverId to be a valid User ID,
    // we'll need to create a special AI user
    const isAIReceiver = data.receiverId.startsWith("ai");

    if (isAIReceiver) {
      // create or get AI bot user in the database
      const aiUser = await this.ensureAIUserExists(data.receiverId);

      return this.prisma.message.create({
        data: {
          content: data.content,
          senderId,
          receiverId: aiUser.id,
          supportId: data.supportId,
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
    } else {
      // regular human-to-human message
      return this.prisma.message.create({
        data: {
          content: data.content,
          senderId,
          receiverId: data.receiverId,
          supportId: data.supportId,
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
    }
  }

  async getMessages(userId: string, data: GetMessagesDto) {
    const isAIConversation = data.receiverId.startsWith("ai");
    let actualReceiverId = data.receiverId;

    if (isAIConversation) {
      // get or create the AI user to get its actual UUID
      const aiUser = await this.ensureAIUserExists(data.receiverId);
      actualReceiverId = aiUser.id;
    }

    const where = {
      OR: [
        {
          senderId: userId,
          receiverId: actualReceiverId,
        },
        {
          senderId: actualReceiverId,
          receiverId: userId,
        },
      ],
      ...(data.supportId && { supportId: data.supportId }),
      deletedAt: null,
    };

    const [messages, total] = await Promise.all([
      this.prisma.message.findMany({
        where,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (data.page - 1) * data.limit,
        take: data.limit,
      }),
      this.prisma.message.count({ where }),
    ]);

    return { messages, total };
  }

  async getUserConversations(userId: string) {
    // get all unique convo partners
    const conversations = await this.prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
        deletedAt: null,
      },
      select: {
        senderId: true,
        receiverId: true,
        content: true,
        createdAt: true,
        readAt: true,
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // group by conversation partner
    const conversationMap = new Map();

    conversations.forEach((message) => {
      // if user sent partner is receiver, if user received partner is sender
      const partnerId =
        message.senderId === userId ? message.receiverId : message.senderId;

      if (!partnerId) return; // skip if partnerId is null

      if (!conversationMap.has(partnerId)) {
        const isAI = partnerId.startsWith("ai");
        const partnerInfo =
          message.senderId === userId ? message.receiver : message.sender;

        conversationMap.set(partnerId, {
          participantId: partnerId,
          participantName: isAI
            ? "AI Assistant"
            : `${partnerInfo?.name} ${partnerInfo?.surname}`,
          isAI,
          lastMessage: {
            content: message.content,
            createdAt: message.createdAt,
            isRead: !!message.readAt,
          },
          unreadCount: 0,
        });
      }
    });

    // calculate unread counts
    for (const [partnerId, conversation] of conversationMap) {
      const unreadCount = await this.prisma.message.count({
        where: {
          senderId: partnerId,
          receiverId: userId,
          readAt: null,
          deletedAt: null,
        },
      });
      conversation.unreadCount = unreadCount;
    }

    return Array.from(conversationMap.values());
  }

  async markMessagesAsRead(userId: string, messageIds: string[]) {
    return this.prisma.message.updateMany({
      where: {
        id: { in: messageIds },
        receiverId: userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  }

  async deleteMessage(messageId: string, userId: string) {
    // users can only delete their own messages
    return this.prisma.message.update({
      where: {
        id: messageId,
        senderId: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async editMessage(messageId: string, userId: string, data: EditMessageDto) {
    // users can only edit their own messages that haven't been deleted
    return this.prisma.message.update({
      where: {
        id: messageId,
        senderId: userId,
        deletedAt: null,
      },
      data: {
        content: data.content,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
      },
    });
  }
}
