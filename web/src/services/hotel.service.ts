import axios from "axios";
import { CreateHotelInput, QueryHotelInput, UpdateHotelInput } from "@/types/hotel";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const hotelService = {
  async createHotel(hotelData: CreateHotelInput) {
    const response = await axios.post(
      `${API_BASE_URL}/hotels`,
      hotelData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  },

  async getHotelById(hotelId: string) {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  async updateHotel(hotelId: string, hotelData: UpdateHotelInput) {
    const response = await axios.put(
      `${API_BASE_URL}/hotels/${hotelId}`,
      hotelData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  },

  async deleteHotel(hotelId: string) {
    const response = await axios.delete(
      `${API_BASE_URL}/hotels/${hotelId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  },

  async getHotels(queryParams: QueryHotelInput) {
    // API ile uyumlu parametreleri hazırla
    const apiParams: QueryHotelInput = {};
    
    if (queryParams.page) apiParams.page = queryParams.page;
    if (queryParams.limit) apiParams.limit = queryParams.limit;
    if (queryParams.search) apiParams.search = queryParams.search;
    if (queryParams.city) apiParams.city = queryParams.city;
    if (queryParams.country) apiParams.country = queryParams.country;
    if (queryParams.type) apiParams.type = queryParams.type;
    if (queryParams.isDiscounted !== undefined) apiParams.isDiscounted = queryParams.isDiscounted;
    if (queryParams.isActive !== undefined) apiParams.isActive = queryParams.isActive;
    if (queryParams.ownerId) apiParams.ownerId = queryParams.ownerId;
    if (queryParams.minRating) apiParams.minRating = queryParams.minRating;
    if (queryParams.maxRating) apiParams.maxRating = queryParams.maxRating;
    if (queryParams.minDiscountPrice) apiParams.minDiscountPrice = queryParams.minDiscountPrice;
    if (queryParams.maxDiscountPrice) apiParams.maxDiscountPrice = queryParams.maxDiscountPrice;
    if (queryParams.sortBy) apiParams.sortBy = queryParams.sortBy;
    if (queryParams.sortOrder) apiParams.sortOrder = queryParams.sortOrder;
    
    const response = await axios.get(`${API_BASE_URL}/hotels`, {
      params: apiParams,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
};