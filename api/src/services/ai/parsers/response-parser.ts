import { AIResponse } from "../types";

export class ResponseParser {
  public static parseAIResponse(
    response: string,
    userMessage: string
  ): AIResponse {
    // clean up response - remove \n and normalize whitespace
    let cleanedResponse = response
      .replace(/\\n\\n/g, "\n\n") // convert literal \n\n to actual newlines
      .replace(/\\n/g, "\n") // convert literal \n to actual newlines
      .replace(/\n\s*\n\s*\n/g, "\n\n") // remove excessive newlines
      .trim();

    // check if the response contains escalation instruction anywhere in the text
    const escalationMatch = cleanedResponse.match(
      /ESCALATE:\s*(\w+)\s*\|\s*(.+?)(?:\n|$)/
    );

    if (escalationMatch) {
      const category = escalationMatch[1].toLowerCase();
      const reason = escalationMatch[2].trim();

      // remove the escalation instruction from the content sent to user
      const userResponse = cleanedResponse
        .replace(/ESCALATE:\s*\w+\s*\|\s*.+?(?:\n|$)/g, "")
        .trim();

      return {
        content:
          userResponse ||
          "I'm unable to assist with this request directly. I'm creating a support ticket to connect you with a specialist who can help you.",
        shouldCreateTicket: true,
        suggestedCategory: this.mapCategoryToEnum(category),
        escalationReason: reason,
      };
    }

    return {
      content: cleanedResponse,
      shouldCreateTicket: false,
    };
  }

  private static mapCategoryToEnum(category: string): string {
    const categoryMap: { [key: string]: string } = {
      technical: "TECHNICAL",
      billing: "BILLING",
      reservation: "RESERVATION",
      complaint: "COMPLAINT",
      other: "OTHER",
    };

    return categoryMap[category] || "GENERAL";
  }
}
