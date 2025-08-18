import PrismaClientInstance from "../../config/db";
import { Prisma } from "@prisma/client";

export type ReservationFilters = {
  userId?: string;
  roomId?: string;
  startDateFrom?: Date;
  startDateTo?: Date;
  deleted?: boolean; // true: silinmişler, false: silinmemişler, undefined: hepsi
};

export type ReservationSort = {
  sortBy?: "createdAt" | "startDate" | "endDate" | "totalPrice";
  sortOrder?: "asc" | "desc";
};

export class ReservationRepository {
  static async create(data: Prisma.ReservationUncheckedCreateInput) {
    return PrismaClientInstance.reservation.create({ data });
  }

  static async findById(id: string) {
    return PrismaClientInstance.reservation.findUnique({
      where: { id },
      include: ({
        room: true,
        user: true,
        paymentCard: true,
      } as unknown) as Prisma.ReservationInclude,
    });
  }

  static async findMany(
    where: ReservationFilters,
    page = 1,
    limit = 10,
    sort: ReservationSort = {}
  ) {
    const { sortBy = "createdAt", sortOrder = "desc" } = sort;

    const andConditions: Prisma.ReservationWhereInput[] = [];

    if (where.userId) andConditions.push({ userId: where.userId });
    if (where.roomId) andConditions.push({ roomId: where.roomId });

    if (where.startDateFrom || where.startDateTo) {
      const dateRange: Record<string, Date | undefined> = {};
      if (where.startDateFrom) dateRange.gte = where.startDateFrom;
      if (where.startDateTo) dateRange.lte = where.startDateTo;
      andConditions.push(({ startDate: dateRange } as unknown) as Prisma.ReservationWhereInput);
    }

    // deletedAt filtresi
    if (where.deleted === true) {
      andConditions.push({ deletedAt: { not: null } });
    } else if (where.deleted === false) {
      andConditions.push({ deletedAt: null });
    }

    const finalWhere: Prisma.ReservationWhereInput =
      andConditions.length ? { AND: andConditions } : {};

    const [items, total] = await Promise.all([
      PrismaClientInstance.reservation.findMany({
        where: finalWhere,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: ({
          room: true,
          user: true,
          paymentCard: true,
        } as unknown) as Prisma.ReservationInclude,
      }),
      PrismaClientInstance.reservation.count({ where: finalWhere }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async update(id: string, data: Prisma.ReservationUncheckedUpdateInput) {
    return PrismaClientInstance.reservation.update({
      where: { id },
      data,
      include: ({
        room: true,
        user: true,
        paymentCard: true,
      } as unknown) as Prisma.ReservationInclude,
    });
  }

  // Soft delete: deletedAt set edilir
  static async softDelete(id: string) {
    return PrismaClientInstance.reservation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Oda için çakışan rezervasyon var mı? 
  static async existsOverlap(params: {
    roomId: string;
    startDate: Date;
    endDate: Date;
    excludeReservationId?: string; // update senaryosu için
  }) {
    const { roomId, startDate, endDate, excludeReservationId } = params;

    return PrismaClientInstance.reservation.findFirst({
      where: {
        roomId,
        deletedAt: null,
        // [startDate, endDate] aralığı çakışması:
        // (start < existing.end) && (end > existing.start)
        AND: ([
          ({ startDate: { lt: endDate } } as unknown) as Prisma.ReservationWhereInput,
          ({ endDate: { gt: startDate } } as unknown) as Prisma.ReservationWhereInput,
          excludeReservationId ? ({ id: { not: excludeReservationId } } as unknown as Prisma.ReservationWhereInput) : ({} as Prisma.ReservationWhereInput),
        ] as unknown) as Prisma.ReservationWhereInput[],
      },
      select: { id: true },
    });
  }

  // Oda fiyatını almak için basit yardımcı
  static async getRoomWithPrice(roomId: string) {
    return PrismaClientInstance.room.findUnique({
      where: { id: roomId },
      select: { id: true, price: true },
    });
  }
}
