import { EscalationResult } from "../types";

export class EscalationHandler {
  public static shouldEscalateToHuman(
    userMessage: string,
    aiResponse: string
  ): EscalationResult {
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();

    const suggestsHumanSupport =
      lowerResponse.includes("human support") ||
      lowerResponse.includes("support team") ||
      lowerResponse.includes("contact our team") ||
      lowerResponse.includes("escalate") ||
      lowerResponse.includes("connect you") ||
      lowerResponse.includes("billing team") ||
      lowerResponse.includes("technical team") ||
      lowerResponse.includes("complaints team") ||
      lowerResponse.includes("investigation") ||
      lowerResponse.includes("further assistance") ||
      // Turkish support indicators
      lowerResponse.includes("insan desteği") ||
      lowerResponse.includes("destek ekibi") ||
      lowerResponse.includes("ekibimizle iletişim") ||
      lowerResponse.includes("bağlanıyor") ||
      lowerResponse.includes("yönlendiriliyor") ||
      lowerResponse.includes("teknik ekip") ||
      lowerResponse.includes("muhasebe ekibi") ||
      lowerResponse.includes("şikayet ekibi");

    // security/account issues - always escalate (English and Turkish)
    if (
      lowerMessage.includes("hacked") ||
      lowerMessage.includes("unauthorized") ||
      lowerMessage.includes("security breach") ||
      lowerMessage.includes("suspicious activity") ||
      lowerMessage.includes("account compromised") ||
      lowerMessage.includes("someone else") ||
      lowerMessage.includes("not me") ||
      (lowerMessage.includes("booking") &&
        lowerMessage.includes("didn't make")) ||
      (lowerMessage.includes("password") &&
        (lowerMessage.includes("change") || lowerMessage.includes("reset"))) ||
      // Turkish security keywords
      lowerMessage.includes("hacklendi") ||
      lowerMessage.includes("yetkisiz") ||
      lowerMessage.includes("güvenlik ihlali") ||
      lowerMessage.includes("şüpheli aktivite") ||
      lowerMessage.includes("hesap ele geçirildi") ||
      lowerMessage.includes("başka biri") ||
      lowerMessage.includes("ben değil") ||
      lowerMessage.includes("şifre değiştir") ||
      lowerMessage.includes("şifre sıfırla")
    ) {
      return {
        shouldEscalate: true,
        category: "SECURITY",
        reason: "Account security issue requiring immediate attention",
      };
    }

    // billing/payment issues - always escalate (English and Turkish)
    if (
      lowerMessage.includes("refund") ||
      lowerMessage.includes("double charge") ||
      lowerMessage.includes("charged twice") ||
      lowerMessage.includes("payment") ||
      lowerMessage.includes("billing") ||
      lowerMessage.includes("charge") ||
      lowerMessage.includes("bill") ||
      lowerMessage.includes("money back") ||
      lowerMessage.includes("overcharged") ||
      // Turkish billing keywords
      lowerMessage.includes("iade") ||
      lowerMessage.includes("geri ödeme") ||
      lowerMessage.includes("çifte ücret") ||
      lowerMessage.includes("iki kez ücret") ||
      lowerMessage.includes("ödeme") ||
      lowerMessage.includes("fatura") ||
      lowerMessage.includes("ücret") ||
      lowerMessage.includes("para iadesi") ||
      lowerMessage.includes("fazla ücret")
    ) {
      return {
        shouldEscalate: true,
        category: "BILLING",
        reason: "Payment or billing related inquiry requiring human assistance",
      };
    }

    // reservation/booking issues - escalate for cancellations and modifications (English and Turkish)
    if (
      lowerMessage.includes("cancel") ||
      lowerMessage.includes("modify") ||
      lowerMessage.includes("change booking") ||
      lowerMessage.includes("flight cancel") ||
      lowerMessage.includes("emergency") ||
      (lowerMessage.includes("booking") &&
        (lowerMessage.includes("cancel") || lowerMessage.includes("change"))) ||
      lowerMessage.includes("urgent") ||
      // Turkish reservation keywords
      lowerMessage.includes("iptal") ||
      lowerMessage.includes("değiştir") ||
      lowerMessage.includes("rezervasyon değiştir") ||
      lowerMessage.includes("rezervasyon iptal") ||
      lowerMessage.includes("acil") ||
      lowerMessage.includes("acildir") ||
      lowerMessage.includes("konaklama iptal") ||
      lowerMessage.includes("konaklama değiştir")
    ) {
      return {
        shouldEscalate: true,
        category: "RESERVATION",
        reason:
          "Booking cancellation or modification requiring human assistance",
      };
    }

    // technical issues - always escalate (English and Turkish)
    if (
      lowerMessage.includes("bug") ||
      lowerMessage.includes("error") ||
      lowerMessage.includes("not working") ||
      lowerMessage.includes("technical") ||
      lowerMessage.includes("website") ||
      lowerMessage.includes("app") ||
      lowerMessage.includes("loading") ||
      lowerMessage.includes("broken") ||
      // Turkish technical keywords
      lowerMessage.includes("hata") ||
      lowerMessage.includes("çalışmıyor") ||
      lowerMessage.includes("bozuk") ||
      lowerMessage.includes("teknik") ||
      lowerMessage.includes("site") ||
      lowerMessage.includes("uygulama") ||
      lowerMessage.includes("yüklemiyor") ||
      lowerMessage.includes("yüklenmiyor") ||
      lowerMessage.includes("sorun")
    ) {
      return {
        shouldEscalate: true,
        category: "TECHNICAL",
        reason: "Technical issue requiring human assistance",
      };
    }

    // complaints - always escalate (English and Turkish)
    if (
      lowerMessage.includes("complaint") ||
      lowerMessage.includes("terrible") ||
      lowerMessage.includes("awful") ||
      lowerMessage.includes("horrible") ||
      lowerMessage.includes("worst") ||
      lowerMessage.includes("disappointed") ||
      lowerMessage.includes("unsatisfied") ||
      lowerMessage.includes("poor service") ||
      lowerMessage.includes("bad experience") ||
      lowerMessage.includes("dirty") ||
      lowerMessage.includes("unacceptable") ||
      // Turkish complaint keywords
      lowerMessage.includes("şikayet") ||
      lowerMessage.includes("korkunç") ||
      lowerMessage.includes("berbat") ||
      lowerMessage.includes("çok kötü") ||
      lowerMessage.includes("en kötü") ||
      lowerMessage.includes("hayal kırıklığı") ||
      lowerMessage.includes("memnun değil") ||
      lowerMessage.includes("kötü hizmet") ||
      lowerMessage.includes("kötü deneyim") ||
      lowerMessage.includes("kirli") ||
      lowerMessage.includes("kabul edilemez")
    ) {
      return {
        shouldEscalate: true,
        category: "COMPLAINT",
        reason: "Customer complaint requiring human review",
      };
    }

    // general account issues (English and Turkish)
    if (
      lowerMessage.includes("account") ||
      lowerMessage.includes("login") ||
      lowerMessage.includes("profile") ||
      // Turkish account keywords
      lowerMessage.includes("hesap") ||
      lowerMessage.includes("giriş") ||
      lowerMessage.includes("profil") ||
      lowerMessage.includes("üyelik")
    ) {
      return {
        shouldEscalate: true,
        category: "OTHER",
        reason: "Account related inquiry requiring human assistance",
      };
    }

    // if AI response suggests human support but we didn't catch the category above
    if (suggestsHumanSupport) {
      return {
        shouldEscalate: true,
        category: "GENERAL",
        reason: "Issue requires human assistance as suggested by AI",
      };
    }

    return { shouldEscalate: false };
  }
}
