// Comment service

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

export const commentService = {
  async createComment(hotelId: string, commentData: { rating: number; text?: string }) {
    const response = await axios.post(`${API_BASE_URL}/hotels/${hotelId}/comments`, commentData, getAuthHeaders());
    return response.data;
  },

  async getCommentsByHotel(hotelId: string) {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}/comments`, getAuthHeaders());
    return response.data;
  },

  async updateComment(commentId: string, commentData: { rating?: number; text?: string }) {
    const response = await axios.put(`${API_BASE_URL}/hotels/comments/${commentId}`, commentData, getAuthHeaders());
    return response.data;
  },

  async deleteComment(commentId: string) {
    const response = await axios.delete(`${API_BASE_URL}/hotels/comments/${commentId}`, getAuthHeaders());
    return response.data;
  }
};
