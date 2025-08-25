import prisma from "../../config/db";
import { CreatePaymentCardDto, UpdatePaymentCardDto, GetPaymentCardsQueryDto } from "../../dto/payment";

export class PaymentRepository {
  // Kullanıcının tüm kredi kartlarını getir
  static async findByUserId(userId: string, query?: GetPaymentCardsQueryDto) {
    const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = query || {};
    
    const skip = (page - 1) * limit;
    
    const [cards, total] = await Promise.all([
      prisma.paymentCard.findMany({
        where: {
          userId,
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
        select: {
          id: true,
          brand: true,
          last4: true,
          expiresAt: true,
          createdAt: true,
          // token ve userId güvenlik nedeniyle döndürülmez
        },
      }),
      prisma.paymentCard.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      cards,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ID ile kredi kartı getir (kullanıcının kartı olduğunu doğrula)
  static async findById(id: string, userId: string) {
    return prisma.paymentCard.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        brand: true,
        last4: true,
        expiresAt: true,
        createdAt: true,
      },
    });
  }

  // Yeni kredi kartı oluştur
  static async create(userId: string, data: { token: string; brand: string; last4: string; expiresAt: Date }) {
    return prisma.paymentCard.create({
      data: {
        userId,
        token: data.token,
        brand: data.brand,
        last4: data.last4,
        expiresAt: data.expiresAt,
      },
      select: {
        id: true,
        brand: true,
        last4: true,
        expiresAt: true,
        createdAt: true,
      },
    });
  }

  // Kredi kartını güncelle (sadece isim ve son kullanma tarihi güncellenebilir)
  static async update(id: string, userId: string, data: UpdatePaymentCardDto) {
    // Önce kartın kullanıcıya ait olduğunu doğrula
    const existingCard = await this.findById(id, userId);
    if (!existingCard) {
      return null;
    }

    // Güncelleme verilerini hazırla
    const updateData: any = {};
    
    if (data.expiryDate) {
      // MM/YY formatından Date'e çevir
      const [month, year] = data.expiryDate.split('/');
      updateData.expiresAt = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
    }

    // Eğer güncelleme verisi yoksa null döndür
    if (Object.keys(updateData).length === 0) {
      return null;
    }

    return prisma.paymentCard.update({
      where: {
        id,
        userId,
      },
      data: updateData,
      select: {
        id: true,
        brand: true,
        last4: true,
        expiresAt: true,
        createdAt: true,
      },
    });
  }

  // Kredi kartını sil
  static async delete(id: string, userId: string) {
    // Önce kartın kullanıcıya ait olduğunu ve aktif rezervasyonlarda kullanılmadığını kontrol et
    const card = await prisma.paymentCard.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        reservation: {
          where: {
            deletedAt: null,
            endDate: {
              gte: new Date(), // Gelecekteki rezervasyonlar
            },
          },
        },
      },
    });

    if (!card) {
      return null;
    }

    // Eğer kartın aktif rezervasyonları varsa silinemez
    if (card.reservation.length > 0) {
      throw new Error("Cannot delete payment card with active reservations");
    }

    return prisma.paymentCard.delete({
      where: {
        id,
        userId,
      },
    });
  }

  // Kredi kartının kullanıcıya ait olduğunu doğrula
  static async verifyOwnership(cardId: string, userId: string): Promise<boolean> {
    const card = await prisma.paymentCard.findFirst({
      where: {
        id: cardId,
        userId,
      },
    });
    return !!card;
  }

  // Kullanıcının varsayılan kredi kartını getir (en son oluşturulan)
  static async getDefaultCard(userId: string) {
    return prisma.paymentCard.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        brand: true,
        last4: true,
        expiresAt: true,
        createdAt: true,
      },
    });
  }

  // Süresi dolmuş kartları getir
  static async getExpiredCards(userId?: string) {
    return prisma.paymentCard.findMany({
      where: {
        ...(userId && { userId }),
        expiresAt: {
          lt: new Date(),
        },
      },
      select: {
        id: true,
        userId: true,
        brand: true,
        last4: true,
        expiresAt: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }
}
