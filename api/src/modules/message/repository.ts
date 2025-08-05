import Prisma from "../../config/db";
import {
  SendMessageSchemaType,
  GetMessagesQuerySchemaType,
} from "../../dto/message";

export class MessageRepository {
  async create(data: SendMessageSchemaType & { senderId: string }) {
    return Prisma.message.create({
      data: {
        content: data.content,
        senderId: data.senderId,
        receiverId: data.receiverId,
        supportId: data.supportId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
        support: {
          select: {
            id: true,
            subject: true,
            status: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return Prisma.message.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
        support: {
          select: {
            id: true,
            subject: true,
            status: true,
          },
        },
      },
    });
  }

  async findUserMessages(userId: string, query: GetMessagesQuerySchemaType) {
    const { page, limit, supportId, conversationWith } = query;
    const skip = (page - 1) * limit;

    const whereCondition: any = {
      deletedAt: null,
      OR: [{ senderId: userId }, { receiverId: userId }],
    };

    if (supportId) {
      whereCondition.supportId = supportId;
    }

    if (conversationWith) {
      whereCondition.OR = [
        { senderId: userId, receiverId: conversationWith },
        { senderId: conversationWith, receiverId: userId },
      ];
    }

    const [messages, total] = await Promise.all([
      Prisma.message.findMany({
        where: whereCondition,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
              role: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
              role: true,
            },
          },
          support: {
            select: {
              id: true,
              subject: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      Prisma.message.count({
        where: whereCondition,
      }),
    ]);

    return {
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findConversations(userId: string) {
    // gets all unique conversations for a user
    const conversations = await Prisma.message.findMany({
      where: {
        deletedAt: null,
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        readAt: true,
        senderId: true,
        receiverId: true,
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
        support: {
          select: {
            id: true,
            subject: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // group messages by conversation partner
    const conversationMap = new Map();

    conversations.forEach((message) => {
      const partnerId =
        message.senderId === userId ? message.receiverId : message.senderId;
      const partner =
        message.senderId === userId ? message.receiver : message.sender;

      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, {
          partner,
          lastMessage: message,
          unreadCount: 0,
        });
      }

      // count unread messages from partner
      if (message.senderId === partnerId && !message.readAt) {
        conversationMap.get(partnerId).unreadCount++;
      }
    });

    return Array.from(conversationMap.values());
  }

  async markAsRead(messageIds: string[], userId: string) {
    return Prisma.message.updateMany({
      where: {
        id: { in: messageIds },
        receiverId: userId,
        readAt: null,
        deletedAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  }

  async getUnreadCount(userId: string) {
    return Prisma.message.count({
      where: {
        receiverId: userId,
        readAt: null,
        deletedAt: null,
      },
    });
  }

  async delete(id: string, userId: string) {
    return Prisma.message.updateMany({
      where: {
        id,
        OR: [{ senderId: userId }, { receiverId: userId }],
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findSupportMessages(supportId: string, userId: string) {
    return Prisma.message.findMany({
      where: {
        supportId,
        deletedAt: null,
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
