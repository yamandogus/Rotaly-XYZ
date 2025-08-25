import OpenAI from "openai";
import { AIConfig, AIResponse, GenerateResponseOptions } from "./types";
import { SystemPromptBuilder } from "./prompts/system-prompt";
import { HotelSearchParser } from "./parsers/hotel-search-parser";
import { ResponseParser } from "./parsers/response-parser";
import { EscalationHandler } from "./escalation/escalation-handler";
import { HotelSearchService } from "./hotel/hotel-search.service";
import { FallbackResponseHandler } from "./fallback/fallback-response.handler";

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
    options?: GenerateResponseOptions
  ): Promise<AIResponse> {
    const { context, conversationHistory = [] } = options || {};

    try {
      // parse hotel search request from user message AND conversation history
      const hotelSearchParams = await HotelSearchParser.parseHotelSearchRequest(
        userMessage,
        conversationHistory
      );
      let hotelRecommendations: any[] = [];

      console.log("Hotel search params:", hotelSearchParams);

      // if this looks like a hotel search request with enough info, fetch relevant hotels
      if (hotelSearchParams && hotelSearchParams.location) {
        console.log("Searching hotels for:", hotelSearchParams.location);
        hotelRecommendations = await HotelSearchService.searchHotels(
          hotelSearchParams
        );
        console.log("Found hotels:", hotelRecommendations.length);
      }

      if (!this.openai) {
        const fallbackResponse = FallbackResponseHandler.getFallbackResponse(
          userMessage,
          hotelRecommendations,
          hotelSearchParams
        );
        const shouldEscalate = EscalationHandler.shouldEscalateToHuman(
          userMessage,
          fallbackResponse
        );
        return {
          content: fallbackResponse,
          shouldCreateTicket: shouldEscalate.shouldEscalate,
          suggestedCategory: shouldEscalate.category,
          escalationReason: shouldEscalate.reason,
          hotelRecommendations,
        };
      }

      const systemPrompt = SystemPromptBuilder.buildSystemPrompt();
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
      ];

      if (context) {
        messages.push({ role: "assistant", content: `Context: ${context}` });
      }

      // add hotel search results to context if available
      if (hotelRecommendations.length > 0) {
        const hotelContext =
          HotelSearchService.formatHotelSearchResults(hotelRecommendations);
        messages.push({
          role: "assistant",
          content: `Available Hotels Found: ${hotelContext}`,
        });
      }

      // add conversation history (limit to last 10 messages to avoid token limits)
      if (conversationHistory.length > 0) {
        const recentHistory = conversationHistory.slice(-10);
        messages.push(...recentHistory);
      }

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

      // parse the structured response
      const aiResponse = ResponseParser.parseAIResponse(
        response.trim(),
        userMessage
      );

      // check for escalation if not already detected
      if (!aiResponse.shouldCreateTicket) {
        const escalation = EscalationHandler.shouldEscalateToHuman(
          userMessage,
          aiResponse.content
        );
        aiResponse.shouldCreateTicket = escalation.shouldEscalate;
        aiResponse.suggestedCategory = escalation.category;
        aiResponse.escalationReason = escalation.reason;
      }

      aiResponse.hotelRecommendations = hotelRecommendations;
      return aiResponse;
    } catch (error) {
      console.error("Error generating AI response:", error);
      const fallbackResponse =
        FallbackResponseHandler.getFallbackResponse(userMessage);

      const shouldEscalate = EscalationHandler.shouldEscalateToHuman(
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
