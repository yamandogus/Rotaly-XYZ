import { HotelSearchParams } from "../types";

export class FallbackResponseHandler {
  public static getFallbackResponse(
    userMessage: string,
    hotelRecommendations?: any[],
    hotelSearchParams?: HotelSearchParams | null
  ): string {
    const lowerMessage = userMessage.toLowerCase();
    const isTurkish = this.detectTurkish(lowerMessage);

    // if we have hotel recommendations, include them in the response
    if (hotelRecommendations && hotelRecommendations.length > 0) {
      const hotelList = hotelRecommendations
        .map((hotel, index) => {
          const price = hotel.averagePrice
            ? isTurkish
              ? ` - Ortalama: ₺${hotel.averagePrice}/gece`
              : ` - Average: $${hotel.averagePrice}/night`
            : "";
          const rating = hotel.rating ? ` (${hotel.rating.toFixed(1)}/5)` : "";
          const discount = hotel.isDiscounted
            ? isTurkish
              ? ` 🏷️ %${hotel.discountRate} İNDİRİM`
              : ` 🏷️ ${hotel.discountRate}% OFF`
            : "";
          return `${index + 1}. **${hotel.name}** ${
            isTurkish ? "şehrinde" : "in"
          } ${hotel.city}${rating}${price}${discount}`;
        })
        .join("\n");

      const dateInfo =
        hotelSearchParams?.checkIn && hotelSearchParams?.checkOut
          ? isTurkish
            ? ` ${hotelSearchParams.checkIn} ile ${hotelSearchParams.checkOut} tarihleri arasındaki konaklamanız için`
            : ` for your stay from ${hotelSearchParams.checkIn} to ${hotelSearchParams.checkOut}`
          : "";
      const guestInfo =
        hotelSearchParams?.guests && hotelSearchParams.guests > 1
          ? isTurkish
            ? ` ${hotelSearchParams.guests} misafir için`
            : ` for ${hotelSearchParams.guests} guests`
          : hotelSearchParams?.guests === 1
          ? isTurkish
            ? " yalnız seyahatiniz için"
            : " for your solo trip"
          : "";

      const locationText =
        hotelSearchParams?.location ||
        (isTurkish ? "hedefiniz" : "your destination");

      return isTurkish
        ? `Harika! ${locationText} şehrinde${dateInfo}${guestInfo} mükemmel otel seçenekleri buldum:\n\n${hotelList}\n\nBu otellerden herhangi biri hakkında daha fazla bilgi ister misiniz, yoksa rezervasyon sürecinde yardımcı olmamı mı istiyorsunuz?`
        : `Great! I found some excellent hotel options in ${locationText}${dateInfo}${guestInfo}:\n\n${hotelList}\n\nWould you like more details about any of these hotels, or shall I help you with the booking process?`;
    }

    // if hotel search params detected but no results, provide helpful message
    if (hotelSearchParams && hotelSearchParams.location) {
      const missingInfo = [];
      if (!hotelSearchParams.checkIn || !hotelSearchParams.checkOut) {
        missingInfo.push(isTurkish ? "tarihleri" : "dates");
      }

      if (missingInfo.length > 0) {
        return isTurkish
          ? `${
              hotelSearchParams.location
            } şehrinde otel aradığınızı görüyorum! Size en iyi seçenekleri bulabilmem için, lütfen ${missingInfo.join(
              " ve "
            )}nizi belirtir misiniz? Bu, ihtiyaçlarınıza uygun konaklama seçeneklerini aramama yardımcı olacak.`
          : `I see you're looking for hotels in ${
              hotelSearchParams.location
            }! To find the best options for you, could you please provide your ${missingInfo.join(
              " and "
            )}? This will help me search for available accommodations that match your needs.`;
      } else {
        return isTurkish
          ? `${hotelSearchParams.location} şehrinde oteller aradım ancak tarihlerde müsait seçenek bulamadım. Daha geniş bir arama yapmaya çalışayım veya tarihlerinizi biraz değiştirmeyi düşünebilirsiniz.`
          : `I searched for hotels in ${hotelSearchParams.location} but didn't find any available options for your dates. Let me try a broader search or you might want to consider adjusting your dates slightly.`;
      }
    }

    return this.getGenericFallbackResponse(lowerMessage);
  }

  private static getGenericFallbackResponse(lowerMessage: string): string {
    // detect if message is in Turkish
    const isTurkish = this.detectTurkish(lowerMessage);

    if (
      lowerMessage.includes("hotel") ||
      lowerMessage.includes("booking") ||
      lowerMessage.includes("reservation") ||
      lowerMessage.includes("otel") ||
      lowerMessage.includes("rezervasyon") ||
      lowerMessage.includes("konaklama")
    ) {
      return isTurkish
        ? "Size mükemmel otel bulmak için yardımcı olmaktan mutluluk duyarım! Lütfen bana şunları söyler misiniz:\n• Nerede kalmak istiyorsunuz?\n• Check-in ve check-out tarihleriniz nedir?\n• Kaç misafir kalacaksınız?\n\nVeritabanımızdan sizin için en iyi seçenekleri arayacağım!"
        : "I'd be happy to help you find the perfect hotel! Could you please tell me:\n• Where would you like to stay?\n• What are your check-in and check-out dates?\n• How many guests will be staying?\n\nI'll search our database for the best options for you!";
    }

    if (
      lowerMessage.includes("cancel") ||
      lowerMessage.includes("refund") ||
      lowerMessage.includes("iptal") ||
      lowerMessage.includes("iade")
    ) {
      return isTurkish
        ? "İptal ve iade işlemleri konusunda doğrudan yardımcı olamıyorum. Sizi, rezervasyon detaylarınızı inceleyebilecek ve politikalarımız doğrultusunda iptal sürecinde yardımcı olabilecek insan destek ekibimizle bağlantıya geçiriyorum."
        : "I'm unable to assist with cancellations and refunds directly. I'm connecting you with our human support team who can review your specific booking details and assist you with the cancellation process according to our policies.";
    }

    if (
      lowerMessage.includes("payment") ||
      lowerMessage.includes("card") ||
      lowerMessage.includes("charge") ||
      lowerMessage.includes("ödeme") ||
      lowerMessage.includes("kart") ||
      lowerMessage.includes("ücret")
    ) {
      return isTurkish
        ? "Ödeme ile ilgili sorularınız konusunda doğrudan yardımcı olamıyorum. Ödeme bilgilerinizi güvenli bir şekilde inceleyebilecek ve fatura sorularınızı çözebilecek insan destek ekibimizle bağlantıya geçiriyorum."
        : "I'm unable to handle payment-related inquiries directly. I'm connecting you with our human support team who can securely review your payment information and help resolve any billing questions you may have.";
    }

    if (
      lowerMessage.includes("account") ||
      lowerMessage.includes("profile") ||
      lowerMessage.includes("login") ||
      lowerMessage.includes("hesap") ||
      lowerMessage.includes("profil") ||
      lowerMessage.includes("giriş")
    ) {
      return isTurkish
        ? "Hesap ile ilgili konularda doğrudan yardımcı olamıyorum. Hesap güvenliği sorunları, giriş problemleri ve diğer hesap ile ilgili endişelerinizde yardımcı olabilecek insan destek ekibimizle bağlantıya geçiriyorum."
        : "I'm unable to assist with account-related issues directly. I'm connecting you with our human support team who can help with account security issues, login problems, and other account-related concerns.";
    }

    if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support") ||
      lowerMessage.includes("yardım") ||
      lowerMessage.includes("destek")
    ) {
      return isTurkish
        ? "Size yardımcı olmak için buradayım! Otel rezervasyonları, konaklamalar ve platformumuz hakkında genel sorularınızda yardımcı olabilirim. Daha karmaşık konular için insan destek ekibimiz de mevcut. Hangi konuda yardıma ihtiyacınız var?"
        : "I'm here to help! I can assist with hotel bookings, reservations, and general questions about our platform. For more complex issues, our human support team is also available. What specific assistance do you need?";
    }

    return isTurkish
      ? "Rotaly-XYZ'ye hoş geldiniz! Muhteşem konaklamalar bulmanıza ve rezervasyon yapmanıza yardımcı olmak için buradayım. İster otel, ister daire, villa veya diğer konaklama seçenekleri arıyor olun, geniş veritabanımızdan kişiselleştirilmiş öneriler sunabilirim. Bugün size nasıl yardımcı olabilirim?"
      : "Thank you for contacting Rotaly-XYZ! I'm here to help you find and book amazing accommodations. Whether you're looking for hotels, apartments, villas, or other stays, I can search our extensive database and provide personalized recommendations. How can I assist you today?";
  }

  private static detectTurkish(text: string): boolean {
    // turkish specific characters and common words
    const turkishIndicators = [
      "ı",
      "ğ",
      "ü",
      "ş",
      "ö",
      "ç", // turkish characters
      "otel",
      "yardım",
      "yardımcı",
      "destek",
      "rezervasyon",
      "konaklama",
      "tatil",
      "seyahat",
      "gezi",
      "burada",
      "nerede",
      "nasıl",
      "için",
      "var",
      "yok",
      "ile",
      "bir",
      "bu",
      "şu",
      "o",
      "ben",
      "sen",
      "bize",
      "size",
      "bizim",
      "sizin",
      "onun",
      "kendi",
      "kendim",
    ];

    return turkishIndicators.some((indicator) =>
      text.toLowerCase().includes(indicator)
    );
  }
}
