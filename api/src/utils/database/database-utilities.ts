// Database utility functions - originally written for ai.service.ts by Cagla Yagmur Icer

import Prisma from "../../config/db";

export class DatabaseUtilities {
  /**
   * Get all unique cities from the hotels in the database
   */
  static async getAllCities(): Promise<string[]> {
    try {
      const cities = await Prisma.hotel.findMany({
        where: { deletedAt: null, isActive: true },
        select: { city: true },
        distinct: ["city"],
      });

      return cities
        .map((c) => c.city)
        .filter(Boolean)
        .map((city) => city.toLowerCase())
        .sort();
    } catch (error) {
      console.error("Error fetching cities from database:", error);
      return [];
    }
  }

  /**
   * Get all unique countries from the hotels in the database
   */
  static async getAllCountries(): Promise<string[]> {
    try {
      const countries = await Prisma.hotel.findMany({
        where: { deletedAt: null, isActive: true },
        select: { country: true },
        distinct: ["country"],
      });

      return countries
        .map((c) => c.country)
        .filter(Boolean)
        .map((country) => country.toLowerCase())
        .sort();
    } catch (error) {
      console.error("Error fetching countries from database:", error);
      return [];
    }
  }

  /**
   * Check if a city exists in the database
   */
  static async cityExists(cityName: string): Promise<boolean> {
    try {
      const count = await Prisma.hotel.count({
        where: {
          deletedAt: null,
          isActive: true,
          city: { contains: cityName, mode: "insensitive" },
        },
      });
      return count > 0;
    } catch (error) {
      console.error("Error checking if city exists:", error);
      return false;
    }
  }

  /**
   * Get hotel statistics
   */
  static async getHotelStats() {
    try {
      const [totalHotels, totalActiveHotels, cities, countries] =
        await Promise.all([
          Prisma.hotel.count({ where: { deletedAt: null } }),
          Prisma.hotel.count({ where: { deletedAt: null, isActive: true } }),
          this.getAllCities(),
          this.getAllCountries(),
        ]);

      return {
        totalHotels,
        totalActiveHotels,
        totalCities: cities.length,
        totalCountries: countries.length,
        cities,
        countries,
      };
    } catch (error) {
      console.error("Error getting database stats:", error);
      return null;
    }
  }
}
