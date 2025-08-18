import OpenAI from "openai";

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

  async generateEnhancedResponse(
    userMessage: string,
    conversationHistory: { role: "user" | "assistant"; content: string }[] = []
  ): Promise<AIResponse> {
    try {
      if (!this.openai) {
        const fallbackResponse = this.getFallbackResponse(userMessage);
        const shouldEscalate = this.shouldEscalateToHuman(
          userMessage,
          fallbackResponse
        );
        return {
          content: fallbackResponse,
          shouldCreateTicket: shouldEscalate.shouldEscalate,
          suggestedCategory: shouldEscalate.category,
          escalationReason: shouldEscalate.reason,
        };
      }

      const systemPrompt = this.buildEnhancedSystemPrompt();
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

      // Parse the structured response
      const aiResponse = this.parseAIResponse(response.trim(), userMessage);
      return aiResponse;
    } catch (error) {
      console.error("Error generating enhanced AI response:", error);
      const fallbackResponse = this.getFallbackResponse(userMessage);
      const shouldEscalate = this.shouldEscalateToHuman(
        userMessage,
        fallbackResponse
      );
      return {
        content: fallbackResponse,
        shouldCreateTicket: shouldEscalate.shouldEscalate,
        suggestedCategory: shouldEscalate.category,
        escalationReason: shouldEscalate.reason,
      };
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

  private buildEnhancedSystemPrompt(): string {
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

IMPORTANT: When you need to escalate to human support, format your response as follows:
ESCALATE: [CATEGORY] | [REASON]
[Your response to the user]

Categories for escalation:
- TECHNICAL: Technical issues with the website/app
- BILLING: Payment problems or refunds
- RESERVATION: Complex booking modifications
- COMPLAINT: Complaints that require investigation
- OTHER: Account security issues or other complex matters

Example:
ESCALATE: BILLING | User needs refund processing
For refund requests, I'll connect you with our billing team who can process this for you.

Only use ESCALATE when you truly cannot help or when the issue requires human intervention.`;
  }

  private parseAIResponse(response: string, userMessage: string): AIResponse {
    // Check if the response contains escalation instruction
    if (response.startsWith("ESCALATE:")) {
      const lines = response.split("\n");
      const escalationLine = lines[0];
      const userResponse = lines.slice(1).join("\n").trim();

      // Parse escalation line: ESCALATE: CATEGORY | REASON
      const escalationMatch = escalationLine.match(
        /ESCALATE:\s*(\w+)\s*\|\s*(.+)/
      );

      if (escalationMatch) {
        const category = escalationMatch[1].toLowerCase();
        const reason = escalationMatch[2];

        return {
          content:
            userResponse ||
            "I'll create a support ticket for you to get personalized assistance.",
          shouldCreateTicket: true,
          suggestedCategory: this.mapCategoryToEnum(category),
          escalationReason: reason,
        };
      }
    }

    // Check if response suggests contacting human support
    const lowerResponse = response.toLowerCase();
    if (
      lowerResponse.includes("human support") ||
      lowerResponse.includes("support team") ||
      lowerResponse.includes("contact our team")
    ) {
      const escalation = this.shouldEscalateToHuman(userMessage, response);
      return {
        content: response,
        shouldCreateTicket: escalation.shouldEscalate,
        suggestedCategory: escalation.category,
        escalationReason: escalation.reason,
      };
    }

    return {
      content: response,
      shouldCreateTicket: false,
    };
  }

  private shouldEscalateToHuman(
    userMessage: string,
    aiResponse: string
  ): {
    shouldEscalate: boolean;
    category?: string;
    reason?: string;
  } {
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();

    // Check if AI response suggests human support
    const suggestsHumanSupport =
      lowerResponse.includes("human support") ||
      lowerResponse.includes("support team") ||
      lowerResponse.includes("contact our team");

    if (!suggestsHumanSupport) {
      return { shouldEscalate: false };
    }

    // Determine category based on user message content
    if (
      lowerMessage.includes("refund") ||
      lowerMessage.includes("payment") ||
      lowerMessage.includes("charge") ||
      lowerMessage.includes("bill")
    ) {
      return {
        shouldEscalate: true,
        category: "BILLING",
        reason: "Payment or billing related inquiry requiring human assistance",
      };
    }

    if (
      lowerMessage.includes("cancel") ||
      lowerMessage.includes("modify") ||
      lowerMessage.includes("change booking") ||
      lowerMessage.includes("reservation")
    ) {
      return {
        shouldEscalate: true,
        category: "RESERVATION",
        reason: "Complex reservation modification requiring human assistance",
      };
    }

    if (
      lowerMessage.includes("bug") ||
      lowerMessage.includes("error") ||
      lowerMessage.includes("not working") ||
      lowerMessage.includes("technical")
    ) {
      return {
        shouldEscalate: true,
        category: "TECHNICAL",
        reason: "Technical issue requiring human assistance",
      };
    }

    if (
      lowerMessage.includes("complaint") ||
      lowerMessage.includes("problem") ||
      lowerMessage.includes("issue") ||
      lowerMessage.includes("unsatisfied")
    ) {
      return {
        shouldEscalate: true,
        category: "COMPLAINT",
        reason: "Customer complaint requiring human review",
      };
    }

    if (
      lowerMessage.includes("account") ||
      lowerMessage.includes("login") ||
      lowerMessage.includes("password") ||
      lowerMessage.includes("security")
    ) {
      return {
        shouldEscalate: true,
        category: "OTHER",
        reason:
          "Account or security related inquiry requiring human assistance",
      };
    }

    return {
      shouldEscalate: true,
      category: "GENERAL",
      reason: "General inquiry requiring human assistance",
    };
  }

  private mapCategoryToEnum(category: string): string {
    const categoryMap: { [key: string]: string } = {
      technical: "TECHNICAL",
      billing: "BILLING",
      reservation: "RESERVATION",
      complaint: "COMPLAINT",
      other: "OTHER",
    };

    return categoryMap[category] || "GENERAL";
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
