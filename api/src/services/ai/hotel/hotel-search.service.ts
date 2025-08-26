import { getHotels } from "../../../modules/hotel/service";
import { QueryHotelInput } from "../../../dto/hotel/query-hotel.dto";
import { HotelSearchParams } from "../types";

export class HotelSearchService {
  // search for hotels based on parameters
  public static async searchHotels(params: HotelSearchParams): Promise<any[]> {
    try {
      const query: QueryHotelInput = {
        search: params.location,
        limit: 5, // limit to top 5 results for AI processing
        sortBy: "rating",
        sortOrder: "desc",
        isActive: true,
      };

      // add city filter if location looks like a city
      if (params.location && params.location.length > 2) {
        query.city = params.location;
      }

      const result = await getHotels(query);
      return result.hotels || [];
    } catch (error) {
      console.error("Error searching hotels:", error);
      return [];
    }
  }

  // format hotel search results for AI context
  public static formatHotelSearchResults(hotels: any[]): string {
    if (!hotels || hotels.length === 0) {
      return "No hotels found for the specified criteria.";
    }

    return hotels
      .map((hotel, index) => {
        const features = hotel.features
          ? hotel.features.slice(0, 3).join(", ")
          : "";
        const price = hotel.averagePrice
          ? `Average price: $${hotel.averagePrice}/night`
          : "";
        const discount = hotel.isDiscounted
          ? `(${hotel.discountRate}% discount available)`
          : "";

        return `${index + 1}. ${hotel.name}
   Location: ${hotel.city}, ${hotel.country}
   Type: ${hotel.type}
   Rating: ${hotel.rating ? hotel.rating.toFixed(1) : "Not rated"}/5
   ${price} ${discount}
   Features: ${features}
   Description: ${
     hotel.description
       ? hotel.description.substring(0, 100) + "..."
       : "No description available"
   }`;
      })
      .join("\n\n");
  }
}
