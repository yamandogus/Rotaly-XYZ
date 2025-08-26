export interface AIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  content: string;
  shouldCreateTicket: boolean;
  suggestedCategory?: string;
  escalationReason?: string;
  hotelRecommendations?: any[];
}

export interface HotelSearchParams {
  location: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  type?: string;
  maxPrice?: number;
  minRating?: number;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GenerateResponseOptions {
  context?: string;
  conversationHistory?: ConversationMessage[];
}

export interface EscalationResult {
  shouldEscalate: boolean;
  category?: string;
  reason?: string;
}
