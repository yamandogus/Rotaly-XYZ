import OpenAI from "openai";

export interface AIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export class AIService {
  private openai?: OpenAI;
  private config: Required<AIConfig>;

  constructor(config: AIConfig) {
    this.config = {
      apiKey: config.apiKey || "",
      model: config.model || "gpt-3.5-turbo",
      maxTokens: config.maxTokens || 1000,
      temperature: config.temperature || 0.7,
    };

    if (!this.config.apiKey) {
      // don't initialize OpenAI client without API key
      console.warn(
        "OpenAI API key is not provided. AI features will use fallback responses."
      );
      return;
    }

    this.openai = new OpenAI({
      apiKey: this.config.apiKey,
    });
  }

  async generateResponse(
    userMessage: string,
    context?: string
  ): Promise<string> {
    try {
      if (!this.openai) {
        return this.getFallbackResponse(userMessage);
      }

      const systemPrompt = this.buildSystemPrompt();
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
      ];

      if (context) {
        messages.push({ role: "assistant", content: `Context: ${context}` });
      }

      messages.push({ role: "user", content: userMessage });

      const completion = await this.openai.chat.completions.create({
        model: this.config.model,
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error("No response generated from AI");
      }

      return response.trim();
    } catch (error) {
      console.error("Error generating AI response:", error);

      // fallback to basic responses if AI fails
      return this.getFallbackResponse(userMessage);
    }
  }

  async generateResponseWithHistory(
    userMessage: string,
    conversationHistory: { role: "user" | "assistant"; content: string }[] = []
  ): Promise<string> {
    try {
      if (!this.openai) {
        return this.getFallbackResponse(userMessage);
      }

      const systemPrompt = this.buildSystemPrompt();
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
      ];

      // add conversation history (limit to last 10 messages to avoid token limits)
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);

      // add current user message
      messages.push({ role: "user", content: userMessage });

      const completion = await this.openai.chat.completions.create({
        model: this.config.model,
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error("No response generated from AI");
      }

      return response.trim();
    } catch (error) {
      console.error("Error generating AI response with history:", error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private buildSystemPrompt(): string {
    return `You are a helpful customer support assistant for Rotaly-XYZ, a hotel booking and reservation platform. 

Your role is to:
- Help users with hotel bookings, reservations, and account issues
- Provide information about available hotels, rooms, and amenities
- Assist with booking modifications and cancellations
- Answer questions about pricing, policies, and payment methods
- Direct users to human support when necessary for complex issues

Guidelines:
- Be friendly, professional, and helpful
- Keep responses concise but informative
- If you cannot help with something, politely direct the user to contact human support
- Always maintain user privacy and do not ask for sensitive information like passwords or payment details
- Focus on hotel and booking-related topics

If a user needs help with:
- Technical issues with the website/app
- Payment problems or refunds
- Complex booking modifications
- Complaints that require investigation
- Account security issues

Please suggest they contact our human support team for personalized assistance.`;
  }

  private getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("hotel") ||
      lowerMessage.includes("booking") ||
      lowerMessage.includes("reservation")
    ) {
      return "I'd be happy to help you with your hotel booking needs! Could you please provide more details about what you're looking for? Our system offers a wide range of hotels and accommodations.";
    }

    if (lowerMessage.includes("cancel") || lowerMessage.includes("refund")) {
      return "For cancellations and refunds, I recommend contacting our human support team who can review your specific booking details and assist you with the cancellation process according to our policies.";
    }

    if (
      lowerMessage.includes("payment") ||
      lowerMessage.includes("card") ||
      lowerMessage.includes("charge")
    ) {
      return "For payment-related inquiries, please contact our human support team. They can securely review your payment information and help resolve any billing questions you may have.";
    }

    if (
      lowerMessage.includes("account") ||
      lowerMessage.includes("profile") ||
      lowerMessage.includes("login")
    ) {
      return "I can help with general account questions! For account security issues or login problems, please contact our human support team for personalized assistance.";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I'm here to help! I can assist with hotel bookings, reservations, and general questions about our platform. For more complex issues, our human support team is also available. What specific assistance do you need?";
    }

    return "Thank you for contacting Rotaly-XYZ support! I'm here to help with your hotel booking needs and platform questions. Could you please provide more details about what you need assistance with?";
  }

  // method to check if AI service is properly configured
  public async testConnection(): Promise<boolean> {
    try {
      if (!this.openai) {
        return false;
      }

      const testCompletion = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 10,
      });

      return !!testCompletion.choices[0]?.message?.content;
    } catch (error) {
      console.error("AI service test failed:", error);
      return false;
    }
  }
}
