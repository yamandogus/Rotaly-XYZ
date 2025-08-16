import { PrismaClient, Role } from "@prisma/client";
import { CreateSupportDto, GetSupportListDto } from "../../dto/support";
import { AppError } from "../../utils/appError";

export class SupportRepository {
  constructor(private prisma: PrismaClient) {}

  async createSupportRequest(userId: string, data: CreateSupportDto) {
    // find an available support rep
    const supportRep = await this.findAvailableSupportRep();

    return this.prisma.support.create({
      data: {
        subject: data.subject,
        body: data.body,
        category: data.category,
        userId,
        supportRepId: supportRep?.id,
        // create the initial message from the user
        messages: {
          create: {
            content: data.body,
            senderId: userId,
            receiverId: supportRep?.id || userId, // if no support rep, set as self for now
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        supportRep: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            senderId: true,
          },
        },
      },
    });
  }

  async getSupportById(supportId: string, userId: string) {
    const support = await this.prisma.support.findFirst({
      where: {
        id: supportId,
        OR: [
          { userId }, // user's own support request
          { supportRepId: userId }, // support rep's assigned request
          // admin can see all
          {
            user: {
              role: "ADMIN",
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        supportRep: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            senderId: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    if (!support) {
      throw new AppError("Support request not found or access denied", 404);
    }

    return support;
  }

  async getSupportList(
    data: GetSupportListDto,
    userId: string,
    userRole: Role
  ) {
    const whereClause: any = {};

    if (data.status === "open") {
      whereClause.closedAt = null;
    } else if (data.status === "closed") {
      whereClause.closedAt = { not: null };
    }

    if (data.category) {
      whereClause.category = data.category;
    }

    if (userRole === "CUSTOMER") {
      whereClause.userId = userId;
    } else if (userRole === "SUPPORT") {
      whereClause.supportRepId = userId;
    }
    // ADMIN can see all support requests (no additional filter needed)

    const [supports, total] = await Promise.all([
      this.prisma.support.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            },
          },
          supportRep: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              content: true,
              createdAt: true,
              senderId: true,
            },
          },
          _count: {
            select: {
              messages: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (data.page - 1) * data.limit,
        take: data.limit,
      }),
      this.prisma.support.count({ where: whereClause }),
    ]);

    return { supports, total };
  }

  async closeSupportRequest(supportId: string, userId: string, userRole: Role) {
    // check if user has permission to close this support request
    const support = await this.prisma.support.findFirst({
      where: {
        id: supportId,
        OR: [
          { userId }, // user's own request
          { supportRepId: userId }, // assigned support rep
          ...(userRole === "ADMIN" ? [{}] : []), // admin can close any
        ],
      },
    });

    if (!support) {
      throw new AppError("Support request not found or access denied", 404);
    }

    if (support.closedAt) {
      throw new AppError("Support request is already closed", 400);
    }

    return this.prisma.support.update({
      where: { id: supportId },
      data: { closedAt: new Date() },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        supportRep: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            senderId: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  }

  async assignSupportRep(supportId: string, supportRepId: string) {
    // verify the support rep exists and has the correct role
    const supportRep = await this.prisma.user.findFirst({
      where: {
        id: supportRepId,
        role: "SUPPORT",
      },
    });

    if (!supportRep) {
      throw new AppError("Support representative not found", 404);
    }

    return this.prisma.support.update({
      where: { id: supportId },
      data: { supportRepId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        supportRep: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
      },
    });
  }

  private async findAvailableSupportRep() {
    // find support representatives and assign based on current workload
    const supportReps = await this.prisma.user.findMany({
      where: { role: "SUPPORT" },
      include: {
        _count: {
          select: {
            handledSupports: {
              where: {
                closedAt: null, // only count open support requests
              },
            },
          },
        },
      },
      orderBy: {
        handledSupports: {
          _count: "asc", // assign to rep with least open tickets
        },
      },
    });

    // return the support rep with the least current workload
    return supportReps[0] || null;
  }

  async getSupportRepWorkload(supportRepId: string) {
    const workload = await this.prisma.support.groupBy({
      by: ["supportRepId"],
      where: {
        supportRepId,
        closedAt: null,
      },
      _count: {
        id: true,
      },
    });

    return workload[0]?._count?.id || 0;
  }

  async reassignOrphanedSupports() {
    // find support requests without assigned representatives
    const orphanedSupports = await this.prisma.support.findMany({
      where: {
        supportRepId: null,
        closedAt: null,
      },
    });

    for (const support of orphanedSupports) {
      const availableRep = await this.findAvailableSupportRep();
      if (availableRep) {
        await this.prisma.support.update({
          where: { id: support.id },
          data: { supportRepId: availableRep.id },
        });
      }
    }

    return orphanedSupports.length;
  }
}
