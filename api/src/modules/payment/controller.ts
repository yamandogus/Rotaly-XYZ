import { Request, Response, NextFunction } from "express";
import { PaymentService } from "./service";
import { 
  createPaymentCardSchema, 
  updatePaymentCardSchema, 
  getPaymentCardsQuerySchema,
  paymentCardIdSchema 
} from "../../dto/payment";
import { AppError } from "../../utils/appError";
import { TokenPayload } from "../../types/express";

interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export class PaymentController {
  // Kullanıcının kredi kartlarını listele
  static async getPaymentCards(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }

      // Query parametrelerini doğrula - query boşsa default değerler kullan
      const validatedQuery = getPaymentCardsQuerySchema.parse(req.query || {});
      
      const result = await PaymentService.getUserPaymentCards(userId, validatedQuery);
      
      res.status(200).json({
        success: true,
        message: "Payment cards retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // ID ile kredi kartı getir
  static async getPaymentCardById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }

      // Parametreleri doğrula
      const { id } = paymentCardIdSchema.parse(req.params);
      
      const card = await PaymentService.getPaymentCardById(id, userId);
      
      res.status(200).json({
        success: true,
        message: "Payment card retrieved successfully",
        data: card,
      });
    } catch (error) {
      next(error);
    }
  }

  // Yeni kredi kartı ekle
  static async addPaymentCard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }

      // Request body'yi doğrula
      const validatedData = createPaymentCardSchema.parse(req.body);
      
      const newCard = await PaymentService.addPaymentCard(userId, validatedData);
      
      res.status(201).json({
        success: true,
        message: "Payment card added successfully",
        data: newCard,
      });
    } catch (error) {
      next(error);
    }
  }

  // Kredi kartını güncelle
  static async updatePaymentCard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }

      // Parametreleri doğrula
      const { id } = paymentCardIdSchema.parse(req.params);
      
      // Request body'yi doğrula
      const validatedData = updatePaymentCardSchema.parse(req.body);
      
      const updatedCard = await PaymentService.updatePaymentCard(id, userId, validatedData);
      
      res.status(200).json({
        success: true,
        message: "Payment card updated successfully",
        data: updatedCard,
      });
    } catch (error) {
      next(error);
    }
  }

  // Kredi kartını sil
  static async deletePaymentCard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }

      // Parametreleri doğrula
      const { id } = paymentCardIdSchema.parse(req.params);
      
      const result = await PaymentService.deletePaymentCard(id, userId);
      
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  // Varsayılan kredi kartını getir
  static async getDefaultPaymentCard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }
      
      const defaultCard = await PaymentService.getDefaultPaymentCard(userId);
      
      res.status(200).json({
        success: true,
        message: "Default payment card retrieved successfully",
        data: defaultCard,
      });
    } catch (error) {
      next(error);
    }
  }

  // Kart sahipliğini doğrula (rezervasyon işlemleri için)
  static async verifyCardOwnership(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }

      const { id } = paymentCardIdSchema.parse(req.params);
      
      const isOwner = await PaymentService.verifyCardOwnership(id, userId);
      
      res.status(200).json({
        success: true,
        message: "Card ownership verified",
        data: { isOwner },
      });
    } catch (error) {
      next(error);
    }
  }

  // Süresi dolmuş kartları getir (Admin endpoint)
  static async getExpiredCards(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userRole = req.user?.role;
      if (userRole !== "ADMIN") {
        throw new AppError("Admin access required", 403);
      }

      const { userId } = req.query;
      
      const expiredCards = await PaymentService.getExpiredCards(userId as string);
      
      res.status(200).json({
        success: true,
        message: "Expired cards retrieved successfully",
        data: expiredCards,
      });
    } catch (error) {
      next(error);
    }
  }

  // Kullanıcının kredi kartı istatistiklerini getir
  static async getPaymentCardStats(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Authentication required", 401);
      }
      
      const cards = await PaymentService.getUserPaymentCards(userId);
      const expiredCards = await PaymentService.getExpiredCards(userId);
      
      // İstatistikleri hesapla
      const stats = {
        totalCards: cards.pagination.total,
        activeCards: cards.cards.filter(card => card.expiresAt > new Date()).length,
        expiredCards: expiredCards.length,
        cardsByBrand: cards.cards.reduce((acc: any, card) => {
          acc[card.brand] = (acc[card.brand] || 0) + 1;
          return acc;
        }, {}),
      };
      
      res.status(200).json({
        success: true,
        message: "Payment card statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}
