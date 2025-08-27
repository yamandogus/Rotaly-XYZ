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
            receiverId: supportRep?.id,
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

    // status-based filtering
    if (data.status === "open") {
      whereClause.closedAt = null;
    } else if (data.status === "closed") {
      whereClause.closedAt = { not: null };
    }

    // category-based filtering
    if (data.category) {
      whereClause.category = data.category;
    }

    // role-based access
    if (userRole === "CUSTOMER") {
      whereClause.userId = userId;
    } else if (userRole === "SUPPORT") {
      whereClause.supportRepId = userId;
    }
    // ADMIN can see all support reqs (no additional filter needed)

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

  async getSupportRepStatistics() {
    // get all support representatives with their ticket statistics
    const supportReps = await this.prisma.user.findMany({
      where: {
        role: "SUPPORT",
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        _count: {
          select: {
            handledSupports: {
              where: {
                closedAt: null, // open tickets
              },
            },
          },
        },
      },
      orderBy: {
        handledSupports: {
          _count: "desc", // sort by most busy first
        },
      },
    });

    // get total ticket counts for each rep
    const supportRepsWithTotals = await Promise.all(
      supportReps.map(async (rep) => {
        const totalTickets = await this.prisma.support.count({
          where: {
            supportRepId: rep.id,
          },
        });

        return {
          id: rep.id,
          name: rep.name,
          surname: rep.surname,
          email: rep.email,
          openTickets: rep._count.handledSupports,
          totalTickets,
        };
      })
    );

    return supportRepsWithTotals;
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
}
