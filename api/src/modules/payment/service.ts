import { PaymentRepository } from "./repository";
import { CreatePaymentCardDto, UpdatePaymentCardDto, GetPaymentCardsQueryDto } from "../../dto/payment";
import { AppError } from "../../utils/appError";
import crypto from "crypto";

export class PaymentService {
  // Kredi kartı numarasını tokenize et (güvenlik için)
  private static tokenizeCardNumber(cardNumber: string): string {
    // Gerçek uygulamada burada güvenli bir tokenization servisi kullanılmalı
    // Örneğin: Stripe, Square, veya başka bir payment processor
    const hash = crypto.createHash('sha256');
    hash.update(cardNumber + process.env.CARD_ENCRYPTION_KEY || 'default-key');
    return hash.digest('hex');
  }

  // Kart markasını belirle
  private static detectCardBrand(cardNumber: string): string {
    // Kart numarasının başına göre markayı belirle
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = cardNumber.substring(0, 2);
    const firstFourDigits = cardNumber.substring(0, 4);

    // Visa
    if (firstDigit === '4') {
      return 'Visa';
    }
    
    // Mastercard
    if (firstDigit === '5' || (parseInt(firstTwoDigits) >= 51 && parseInt(firstTwoDigits) <= 55)) {
      return 'Mastercard';
    }
    
    // American Express
    if (firstTwoDigits === '34' || firstTwoDigits === '37') {
      return 'American Express';
    }
    
    // Discover
    if (firstFourDigits === '6011' || firstTwoDigits === '65') {
      return 'Discover';
    }

    // Diners Club
    if ((parseInt(firstTwoDigits) >= 30 && parseInt(firstTwoDigits) <= 30) || firstTwoDigits === '36' || firstTwoDigits === '38') {
      return 'Diners Club';
    }

    // Troy (Türkiye'ye özel)
    if (firstFourDigits.startsWith('9792')) {
      return 'Troy';
    }

    return 'Unknown';
  }

  // Son 4 haneyi güvenli şekilde al
  private static getLast4Digits(cardNumber: string): string {
    return cardNumber.slice(-4);
  }

  // Expiry date'i Date objesine çevir
  private static parseExpiryDate(expiryDate: string): Date {
    const [month, year] = expiryDate.split('/');
    // YY formatını YYYY'ye çevir (20XX olarak varsay)
    const fullYear = 2000 + parseInt(year);
    // Ayın son günü olarak ayarla
    return new Date(fullYear, parseInt(month) - 1 + 1, 0); // Bir sonraki ayın 0. günü = bu ayın son günü
  }

  // Kredi kartı doğrulama (Luhn algoritması)
  private static validateCardNumber(cardNumber: string): boolean {
    let sum = 0;
    let isEven = false;

    // Sağdan sola doğru ilerle
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  // Son kullanma tarihini doğrula
  private static validateExpiryDate(expiryDate: string): boolean {
    const [month, year] = expiryDate.split('/');
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Ay kontrolü
    if (monthNum < 1 || monthNum > 12) {
      return false;
    }

    // Tarih kontrolü (gelecekte olmalı)
    const expiry = new Date(2000 + yearNum, monthNum - 1 + 1, 0);
    const now = new Date();
    
    return expiry > now;
  }

  // Kullanıcının kredi kartlarını listele
  static async getUserPaymentCards(userId: string, query?: GetPaymentCardsQueryDto) {
    try {
      return await PaymentRepository.findByUserId(userId, query);
    } catch (error) {
      throw new AppError("Failed to fetch payment cards", 500);
    }
  }

  // ID ile kredi kartı getir
  static async getPaymentCardById(cardId: string, userId: string) {
    try {
      const card = await PaymentRepository.findById(cardId, userId);
      if (!card) {
        throw new AppError("Payment card not found", 404);
      }
      return card;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to fetch payment card", 500);
    }
  }

  // Yeni kredi kartı ekle
  static async addPaymentCard(userId: string, cardData: CreatePaymentCardDto) {
    try {
      // Kart numarasını doğrula
      if (!this.validateCardNumber(cardData.cardNumber)) {
        throw new AppError("Invalid card number", 400);
      }

      // Son kullanma tarihini doğrula
      if (!this.validateExpiryDate(cardData.expiryDate)) {
        throw new AppError("Invalid or expired card", 400);
      }

      // Kart verilerini işle
      const token = this.tokenizeCardNumber(cardData.cardNumber);
      const brand = this.detectCardBrand(cardData.cardNumber);
      const last4 = this.getLast4Digits(cardData.cardNumber);
      const expiresAt = this.parseExpiryDate(cardData.expiryDate);

      // Aynı tokenized kart zaten var mı kontrol et
      const existingCards = await PaymentRepository.findByUserId(userId);
      const isDuplicate = existingCards.cards.some(card => 
        card.last4 === last4 && 
        card.brand === brand &&
        Math.abs(card.expiresAt.getTime() - expiresAt.getTime()) < 86400000 // 1 gün tolerans
      );

      if (isDuplicate) {
        throw new AppError("This card is already registered", 409);
      }

      // Kredi kartını kaydet
      const savedCard = await PaymentRepository.create(userId, {
        token,
        brand,
        last4,
        expiresAt,
      });

      return savedCard;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to add payment card", 500);
    }
  }

  // Kredi kartını güncelle
  static async updatePaymentCard(cardId: string, userId: string, updateData: UpdatePaymentCardDto) {
    try {
      // Son kullanma tarihini doğrula (eğer güncelleme varsa)
      if (updateData.expiryDate && !this.validateExpiryDate(updateData.expiryDate)) {
        throw new AppError("Invalid or expired card", 400);
      }

      const updatedCard = await PaymentRepository.update(cardId, userId, updateData);
      
      if (!updatedCard) {
        throw new AppError("Payment card not found or no changes made", 404);
      }

      return updatedCard;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to update payment card", 500);
    }
  }

  // Kredi kartını sil
  static async deletePaymentCard(cardId: string, userId: string) {
    try {
      const result = await PaymentRepository.delete(cardId, userId);
      
      if (!result) {
        throw new AppError("Payment card not found", 404);
      }

      return { message: "Payment card deleted successfully" };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error instanceof Error && error.message.includes("active reservations")) {
        throw new AppError("Cannot delete payment card with active reservations", 409);
      }
      throw new AppError("Failed to delete payment card", 500);
    }
  }

  // Kullanıcının varsayılan kartını getir
  static async getDefaultPaymentCard(userId: string) {
    try {
      const card = await PaymentRepository.getDefaultCard(userId);
      if (!card) {
        throw new AppError("No payment cards found", 404);
      }
      return card;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Failed to fetch default payment card", 500);
    }
  }

  // Kart sahipliğini doğrula
  static async verifyCardOwnership(cardId: string, userId: string): Promise<boolean> {
    try {
      return await PaymentRepository.verifyOwnership(cardId, userId);
    } catch (error) {
      return false;
    }
  }

  // Süresi dolmuş kartları getir (admin fonksiyonu)
  static async getExpiredCards(userId?: string) {
    try {
      return await PaymentRepository.getExpiredCards(userId);
    } catch (error) {
      throw new AppError("Failed to fetch expired cards", 500);
    }
  }
}
