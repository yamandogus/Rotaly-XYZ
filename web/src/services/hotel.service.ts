import axios from "axios";
import { CreateHotelInput } from "@api/dto/hotel";

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

  async updateHotel(hotelId: string, hotelData: any) {
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

  async getHotels(queryParams: any) {
    const response = await axios.get(`${API_BASE_URL}/hotels`, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
};
