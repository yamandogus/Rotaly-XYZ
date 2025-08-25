import { apiClient } from "./api";

export interface AIChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIChatRequest {
  message: string;
  conversationHistory?: AIChatMessage[];
}

export interface AIChatResponse {
  response: string;
  ticketCreated: boolean;
  supportId?: string;
}

export interface AIStatusResponse {
  available: boolean;
}

class AIChatService {
  // AI ile sohbet et ve otomatik ticket oluştur
  async sendMessage(
    message: string,
    conversationHistory: AIChatMessage[] = []
  ): Promise<AIChatResponse> {
    try {
      console.log("🚀 Sending AI chat request:", {
        message,
        conversationHistory,
      });

      const response = await apiClient.post<{
        success: boolean;
        data: AIChatResponse;
      }>("/support/ai-chat", {
        message,
        conversationHistory,
      });

      console.log("✅ AI chat response received:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("❌ AI chat error:", error);

      // Eğer authentication hatası varsa
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 401) {
          throw new Error("Lütfen giriş yapın.");
        }
      }

      // Diğer hatalar için
      throw new Error("AI ile iletişim kurulamadı. Lütfen tekrar deneyin.");
    }
  }

  // AI servisinin durumunu kontrol et
  async checkAIStatus(): Promise<boolean> {
    try {
      console.log("🔍 Checking AI status...");
      console.log("🌐 API Base URL:", apiClient.defaults.baseURL);
      console.log(
        "🎯 Full URL will be:",
        `${apiClient.defaults.baseURL}/support/ai-status`
      );

      const response = await apiClient.get<{
        success: boolean;
        data: AIStatusResponse;
      }>("/support/ai-status");

      console.log("📊 AI status response:", response.data);
      return response.data.data.available;
    } catch (error) {
      console.error("❌ AI status check error:", error);
      console.log("🔗 Error details:", {
        message: (error as Error)?.message,
        status: (error as { response: { status: number } })?.response?.status,
        url: (error as { config: { url: string } })?.config?.url,
        baseURL: (error as { config: { baseURL: string } })?.config?.baseURL,
      });

      // Eğer authentication hatası varsa
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 401) {
          console.log("🔐 Authentication required for AI status check");
          return false;
        }
      }

      return false;
    }
  }

  // Fallback mesajı - AI kullanılamadığında
  getFallbackMessage(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("rezervasyon") ||
      lowerMessage.includes("booking")
    ) {
      return "Rezervasyon konusunda size yardımcı olmak istiyorum! Lütfen daha detaylı bilgi verebilir misiniz? Sistemimizde geniş bir otel ve konaklama seçeneği bulunmaktadır.";
    }

    if (lowerMessage.includes("iptal") || lowerMessage.includes("iade")) {
      return "İptal ve iade işlemleri için doğrudan yardımcı olamıyorum. Sizi rezervasyon detaylarınızı inceleyebilecek ve politikalarımız doğrultusunda size yardımcı olabilecek destek ekibimizle bağlantıya geçiriyorum.";
    }

    if (
      lowerMessage.includes("ödeme") ||
      lowerMessage.includes("kart") ||
      lowerMessage.includes("ücret")
    ) {
      return "Ödeme ile ilgili sorular için doğrudan yardımcı olamıyorum. Ödeme bilgilerinizi güvenli bir şekilde inceleyebilecek ve faturalama sorularınızı çözebilecek destek ekibimizle bağlantıya geçiriyorum.";
    }

    if (
      lowerMessage.includes("hesap") ||
      lowerMessage.includes("profil") ||
      lowerMessage.includes("giriş")
    ) {
      return "Hesap ile ilgili konularda doğrudan yardımcı olamıyorum. Hesap güvenliği, giriş sorunları ve diğer hesap ile ilgili endişelerinizde size yardımcı olabilecek destek ekibimizle bağlantıya geçiriyorum.";
    }

    if (lowerMessage.includes("yardım") || lowerMessage.includes("destek")) {
      return "Size yardımcı olmak için buradayım! Otel rezervasyonları, konaklama ve platformumuz hakkında genel sorularınızda size yardımcı olabilirim. Daha karmaşık konular için insan destek ekibimiz de mevcuttur. Hangi konuda yardıma ihtiyacınız var?";
    }

    return "Rotaly-XYZ desteğe hoş geldiniz! Otel rezervasyon ihtiyaçlarınız ve platform sorularınız konusunda size yardımcı olmak için buradayım. Lütfen hangi konuda yardıma ihtiyacınız olduğunu belirtir misiniz?";
  }
}

export const aiChatService = new AIChatService();
