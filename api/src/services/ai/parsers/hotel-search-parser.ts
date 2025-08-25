import { HotelSearchParams, ConversationMessage } from "../types";
import { DatabaseUtilities } from "../../../utils/database";

export class HotelSearchParser {
  // cache for cities to avoid repeated database calls
  private static citiesCache: string[] | null = null;
  private static cacheTimestamp: number = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 mins

  // get cities from database with caching
  private static async getCities(): Promise<string[]> {
    const now = Date.now();

    if (this.citiesCache && now - this.cacheTimestamp < this.CACHE_DURATION) {
      return this.citiesCache;
    }

    try {
      this.citiesCache = await DatabaseUtilities.getAllCities();
      this.cacheTimestamp = now;
      return this.citiesCache;
    } catch (error) {
      console.error("Error fetching cities from database:", error);
      // fallback cities if database fails
      return [
        "istanbul",
        "ankara",
        "izmir",
        "antalya",
        "bursa",
        "adana",
        "trabzon",
        "konya",
        "mersin",
        "london",
        "paris",
        "rome",
        "madrid",
        "barcelona",
        "berlin",
        "vienna",
        "amsterdam",
        "prague",
        "budapest",
        "new york",
        "los angeles",
        "chicago",
        "miami",
        "san francisco",
        "seattle",
        "boston",
        "las vegas",
        "tokyo",
        "bangkok",
        "singapore",
        "kuala lumpur",
        "hong kong",
        "seoul",
        "osaka",
        "beijing",
        "shanghai",
        "dubai",
        "cairo",
        "casablanca",
        "marrakech",
        "tunis",
        "riyadh",
        "doha",
        "muscat",
        "sydney",
        "melbourne",
        "auckland",
        "brisbane",
        "perth",
      ];
    }
  }
  // helper method to detect if message contains location and travel dates
  private static async containsLocationAndDates(
    text: string
  ): Promise<boolean> {
    const lowerText = text.toLowerCase();

    // check for city patterns using cities from our database
    const cities = await this.getCities();
    const cityPattern = new RegExp(`\\b(${cities.join("|")})\\b`, "i");
    const hasCityPattern = cityPattern.test(text);

    // check for date patterns (English and Turkish)
    const hasDatePattern =
      // ------- english date patterns
      /(\d{1,2})\s*(?:st|nd|rd|th)?\s*(?:of\s*)?(\w+)\s*to\s*(\d{1,2})\s*(?:st|nd|rd|th)?\s*(?:of\s*)?(\w+)/i.test(
        text
      ) ||
      /(\w+)\s*(\d{1,2})\s*(?:st|nd|rd|th)?\s*to\s*(\w+)\s*(\d{1,2})\s*(?:st|nd|rd|th)?/i.test(
        text
      ) ||
      /(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\s*to\s*(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/i.test(
        text
      ) ||
      // ------ turkish date patterns
      /(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)\s*(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)/i.test(
        text
      ) ||
      /(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)\s*-\s*(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)/i.test(
        text
      ) ||
      /(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)\s*arası/i.test(
        text
      );

    // check for travel-related context (English and Turkish)
    const hasTravelContext =
      lowerText.includes("traveling") ||
      lowerText.includes("trip") ||
      lowerText.includes("vacation") ||
      lowerText.includes("visit") ||
      lowerText.includes("myself") ||
      lowerText.includes("alone") ||
      lowerText.includes("solo") ||
      lowerText.includes("guests") ||
      lowerText.includes("people") ||
      // turkish travel context
      lowerText.includes("seyahat") ||
      lowerText.includes("tatil") ||
      lowerText.includes("gezi") ||
      lowerText.includes("ziyaret") ||
      lowerText.includes("yalnız") ||
      lowerText.includes("tek") ||
      lowerText.includes("misafir") ||
      lowerText.includes("kişi");

    return hasCityPattern && (hasDatePattern || hasTravelContext);
  }

  // extract city name that appears at the start of a message followed by comma or space
  private static async extractDirectCityName(
    message: string
  ): Promise<string | null> {
    // pattern to match city name at start of message (e.g., "istanbul, 28th of August")
    const directCityPattern = /^([a-zA-Z\s]+?)(?:,|\s+\d)/;
    const match = message.trim().match(directCityPattern);

    if (match) {
      const potentialCity = match[1].trim().toLowerCase();

      // get cities from our database
      const knownCities = await this.getCities();

      if (knownCities.includes(potentialCity)) {
        return potentialCity;
      }
    }

    return null;
  }

  public static async parseHotelSearchRequest(
    userMessage: string,
    conversationHistory?: ConversationMessage[]
  ): Promise<HotelSearchParams | null> {
    const lowerMessage = userMessage.toLowerCase();

    // combine current message with conversation history for better context
    let fullContext = userMessage;
    if (conversationHistory && conversationHistory.length > 0) {
      const recentMessages = conversationHistory.slice(-4); // last 4 messages for context
      fullContext =
        recentMessages.map((msg) => msg.content).join(" ") + " " + userMessage;
    }
    const lowerContext = fullContext.toLowerCase();

    // check if this looks like a hotel search request (English and Turkish)
    const isHotelSearch =
      lowerContext.includes("hotel") ||
      lowerContext.includes("find") ||
      lowerContext.includes("book") ||
      lowerContext.includes("stay") ||
      lowerContext.includes("accommodation") ||
      lowerContext.includes("room") ||
      lowerContext.includes("trip") ||
      lowerContext.includes("travel") ||
      // turkish hotel search keywords
      lowerContext.includes("otel") ||
      lowerContext.includes("konaklama") ||
      lowerContext.includes("bul") ||
      lowerContext.includes("ara") ||
      lowerContext.includes("rezervasyon") ||
      lowerContext.includes("oda") ||
      lowerContext.includes("seyahat") ||
      lowerContext.includes("tatil") ||
      lowerContext.includes("yardım") ||
      lowerContext.includes("yardımcı");

    // also check if this is a follow-up response to a hotel search request
    // search for travel details without explicitly using hotel keywords
    const hasLocationAndDates = await this.containsLocationAndDates(
      fullContext
    );
    const isFollowUpResponse =
      conversationHistory &&
      conversationHistory.length > 0 &&
      conversationHistory.some(
        (msg) =>
          msg.content.toLowerCase().includes("hotel") ||
          msg.content.toLowerCase().includes("accommodation") ||
          msg.content.toLowerCase().includes("destination") ||
          msg.content.toLowerCase().includes("stay") ||
          // turkish context
          msg.content.toLowerCase().includes("otel") ||
          msg.content.toLowerCase().includes("konaklama") ||
          msg.content.toLowerCase().includes("seyahat") ||
          msg.content.toLowerCase().includes("tatil")
      );

    if (!isHotelSearch && !(hasLocationAndDates && isFollowUpResponse)) {
      return null;
    }

    // extract the location from full context (current message + history)
    let location = "";

    // first, try to extract from current message directly (for cases like "istanbul, dates...")
    const directCityMatch = await this.extractDirectCityName(userMessage);
    if (directCityMatch) {
      location = directCityMatch;
    }

    // if no location found with keywords, try to extract city names first
    if (!location) {
      // get cities from database and create pattern
      const cities = await this.getCities();
      const cityPatterns = [
        new RegExp(
          `\\b(${cities.filter((c) => c.includes(" ")).join("|")})\\b`,
          "i"
        ), // multi-word cities first
        new RegExp(
          `\\b(${cities.filter((c) => !c.includes(" ")).join("|")})\\b`,
          "i"
        ), // single-word cities
      ];

      for (const pattern of cityPatterns) {
        const match = fullContext.match(pattern);
        if (match) {
          location = match[1];
          break;
        }
      }
    }

    // if not found, try location keywords approach (English and Turkish)
    if (!location) {
      const locationKeywords = [
        "in ",
        "at ",
        "near ",
        "around ",
        "to ",
        // turkish location keywords
        "'da ",
        "'de ",
        "de ",
        "da ",
        "'nde ",
        "'nda ",
        "nde ",
        "nda ",
        "civarında ",
        "yakınında ",
        "için ",
      ];

      for (const keyword of locationKeywords) {
        const index = lowerContext.indexOf(keyword);
        if (index !== -1) {
          const afterKeyword = fullContext.substring(index + keyword.length);
          const nextWords = afterKeyword.split(/[\s,;.!?]+/).slice(0, 3);
          const potentialLocation = nextWords.join(" ").trim();

          // filter out common non-location words (English and Turkish)
          const nonLocationWords = [
            "the",
            "a",
            "an",
            "with",
            "for",
            "from",
            "by",
            "myself",
            "alone",
            "solo",
            // turkish non-location words
            "bir",
            "bu",
            "şu",
            "o",
            "ile",
            "için",
            "den",
            "dan",
            "ten",
            "tan",
            "kendim",
            "yalnız",
            "tek",
            "ben",
            "beni",
            "bana",
            "otel",
            "konaklama",
            "bulmamda",
            "yardımcı",
            "yardım",
            "arıyorum",
            "istiyorum",
            "rezervasyonu",
            "yapmak",
            "tatili",
            "seyahat",
            "edeceğim",
          ];
          if (
            potentialLocation &&
            !nonLocationWords.includes(potentialLocation.toLowerCase())
          ) {
            location = potentialLocation;
            break;
          }
        }
      }
    }

    // extract dates from full context
    let checkIn = "";
    let checkOut = "";

    // date extraction patterns (English and Turkish)
    const dateRangePatterns = [
      // english patterns
      /(\d{1,2})\s*(?:st|nd|rd|th)?\s*(?:of\s*)?(\w+)\s*to\s*(\d{1,2})\s*(?:st|nd|rd|th)?\s*(?:of\s*)?(\w+)/i,
      /(\w+)\s*(\d{1,2})\s*(?:st|nd|rd|th)?\s*to\s*(\w+)\s*(\d{1,2})\s*(?:st|nd|rd|th)?/i,
      /(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\s*to\s*(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/i,
      // turkish patterns
      /(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)\s*-?\s*(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)/i,
      /(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)\s*arası/i,
      /(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)\s*ile\s*(\d{1,2})\s*(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)/i,
    ];

    for (const pattern of dateRangePatterns) {
      const match = fullContext.match(pattern);
      if (match) {
        if (pattern === dateRangePatterns[0]) {
          // "28th of August to 30th of August"
          checkIn = `${match[1]} ${match[2]}`;
          checkOut = `${match[3]} ${match[4]}`;
        } else if (pattern === dateRangePatterns[1]) {
          // "August 28th to August 30th"
          checkIn = `${match[2]} ${match[1]}`;
          checkOut = `${match[4]} ${match[3]}`;
        } else if (pattern === dateRangePatterns[2]) {
          // Date format: "28/08/2025 to 30/08/2025"
          checkIn = `${match[1]}/${match[2]}/${match[3]}`;
          checkOut = `${match[4]}/${match[5]}/${match[6]}`;
        } else if (pattern === dateRangePatterns[3]) {
          // Turkish: "8 eylül - 12 eylül" or "8 eylül 12 eylül"
          checkIn = `${match[1]} ${match[2]}`;
          checkOut = `${match[3]} ${match[4]}`;
        } else if (pattern === dateRangePatterns[4]) {
          // Turkish: "8 eylül arası" (needs follow-up for end date)
          checkIn = `${match[1]} ${match[2]}`;
          checkOut = ""; // Will be filled in follow-up
        } else if (pattern === dateRangePatterns[5]) {
          // Turkish: "8 eylül ile 12 eylül"
          checkIn = `${match[1]} ${match[2]}`;
          checkOut = `${match[3]} ${match[4]}`;
        }
        break;
      }
    }

    // extract guest count from full context
    let guests = 1;

    // check for explicit guest mentions (English and Turkish)
    const guestPatterns = [
      // english patterns
      /(\d+)\s*(?:guest|people|person|adult|traveler)s?/i,
      /(?:for|with)\s*(\d+)/i,
      /party\s*of\s*(\d+)/i,
      // turkish patterns
      /(\d+)\s*(?:kişi|misafir|yetişkin|yolcu)/i,
      /(\d+)\s*kişilik/i,
      /(\d+)\s*kişiyiz/i,
    ];

    for (const pattern of guestPatterns) {
      const match = fullContext.match(pattern);
      if (match) {
        guests = parseInt(match[1]);
        break;
      }
    }

    // check for solo travel indicators (English and Turkish)
    if (
      lowerContext.includes("myself") ||
      lowerContext.includes("alone") ||
      lowerContext.includes("solo") ||
      lowerContext.includes("by myself") ||
      lowerContext.includes("traveling by myself") ||
      // turkish solo travel indicators
      lowerContext.includes("yalnız") ||
      lowerContext.includes("tek") ||
      lowerContext.includes("kendim") ||
      lowerContext.includes("tek başına") ||
      lowerContext.includes("yalnız seyahat") ||
      lowerContext.includes("tek kişi")
    ) {
      guests = 1;
    }

    return {
      location: location || "",
      checkIn,
      checkOut,
      guests,
    };
  }

  private async getCities(): Promise<string[]> {
    try {
      return await DatabaseUtilities.getAllCities();
    } catch (error) {
      console.error("Error getting cities from database:", error);
      // fallback cities if db fails
      return [
        "istanbul",
        "ankara",
        "izmir",
        "antalya",
        "bursa",
        "adana",
        "london",
        "paris",
        "rome",
        "madrid",
        "barcelona",
        "berlin",
        "new york",
        "tokyo",
        "dubai",
        "sydney",
      ];
    }
  }
}
