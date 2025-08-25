import { Router } from "express";
import { PaymentController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { verifiedUser, isAdmin } from "../../middleware/auth.middleware";
import { 
  validateBody, 
  validateParams 
} from "../../middleware/validate.middleware";
import { 
  createPaymentCardSchema, 
  updatePaymentCardSchema,
  paymentCardIdSchema 
} from "../../dto/payment";

const router = Router();

// Tüm payment route'ları authentication gerektiriyor
router.use(authenticateToken);

// Kullanıcının kredi kartlarını listele
// GET /api/payments/cards
router.get(
  "/cards",
  verifiedUser,
  PaymentController.getPaymentCards
);

// Yeni kredi kartı ekle
// POST /api/payments/cards
router.post(
  "/cards",
  verifiedUser,
  validateBody(createPaymentCardSchema),
  PaymentController.addPaymentCard
);

// Varsayılan kredi kartını getir
// GET /api/payments/cards/default
router.get(
  "/cards/default",
  verifiedUser,
  PaymentController.getDefaultPaymentCard
);

// Kredi kartı istatistiklerini getir
// GET /api/payments/cards/stats
router.get(
  "/cards/stats",
  verifiedUser,
  PaymentController.getPaymentCardStats
);

// ID ile kredi kartı getir
// GET /api/payments/cards/:id
router.get(
  "/cards/:id",
  verifiedUser,
  validateParams(paymentCardIdSchema),
  PaymentController.getPaymentCardById
);

// Kredi kartını güncelle
// PUT /api/payments/cards/:id
router.put(
  "/cards/:id",
  verifiedUser,
  validateParams(paymentCardIdSchema),
  validateBody(updatePaymentCardSchema),
  PaymentController.updatePaymentCard
);

// Kredi kartını sil
// DELETE /api/payments/cards/:id
router.delete(
  "/cards/:id",
  verifiedUser,
  validateParams(paymentCardIdSchema),
  PaymentController.deletePaymentCard
);

// Kart sahipliğini doğrula
// GET /api/payments/cards/:id/verify
router.get(
  "/cards/:id/verify",
  verifiedUser,
  validateParams(paymentCardIdSchema),
  PaymentController.verifyCardOwnership
);

// Admin endpoints
// Süresi dolmuş kartları getir (Admin only)
// GET /api/payments/admin/expired-cards
router.get(
  "/admin/expired-cards",
  isAdmin,
  PaymentController.getExpiredCards
);

export default router;
