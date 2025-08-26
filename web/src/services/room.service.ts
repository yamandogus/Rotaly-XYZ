// Room service

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

interface CreateRoomDto {
  name: string;
  description?: string;
  hotelId: string;
  capacity: number;
  price: number;
  amenities?: string[];
  images?: string[];
}

interface UpdateRoomDto {
  name?: string;
  description?: string;
  capacity?: number;
  price?: number;
  amenities?: string[];
  images?: string[];
  isActive?: boolean;
}

export const roomService = {
  async createRoom(roomData: CreateRoomDto) {
    const response = await axios.post(`${API_BASE_URL}/rooms`, roomData, getAuthHeaders());
    return response.data;
  },

  async getRoomById(roomId: string) {
    const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}`, getAuthHeaders());
    return response.data;
  },

  async updateRoom(roomId: string, roomData: UpdateRoomDto) {
    const response = await axios.put(`${API_BASE_URL}/rooms/${roomId}`, roomData, getAuthHeaders());
    return response.data;
  },

  async deleteRoom(roomId: string) {
    const response = await axios.delete(`${API_BASE_URL}/rooms/${roomId}`, getAuthHeaders());
    return response.data;
  },

  async getRoomsByHotel(hotelId: string) {
    const response = await axios.get(`${API_BASE_URL}/rooms`, {
      ...getAuthHeaders(),
      params: { hotelId }
    });
    return response.data;
  }
};
