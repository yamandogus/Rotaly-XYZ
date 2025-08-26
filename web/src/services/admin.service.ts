// Admin Servis Katmanı - Admin paneli için gerekli tüm API isteklerini yönetir

import axios from "axios";
import type { UpdateAdminProfileDto } from "@/types/admin";
import type { UpdateHotelDto, CreateHotelDto } from "@/types/hotel-dto";
import type { UpdateUserDto } from "@/types/user-dto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Admin profil güncelleme için tip tanımı - types/admin.ts'den import ediliyor

// Token'ı localStorage'dan alıp header'a ekleyen yardımcı fonksiyon
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const adminService = {
  // Admin profil bilgilerini getirir (şirket bilgileri, logo vs.)
  async getUserProfile() {
    const response = await axios.get(`${API_BASE_URL}/admin/profile`, getAuthHeaders());
    return response.data;
  },

  // Admin profil bilgilerini günceller (şirket adı, vergi no, adres vs.)
  async updateProfile(data: UpdateAdminProfileDto) {
    const response = await axios.put(`${API_BASE_URL}/admin/dashboard/profile`, data, getAuthHeaders());
    return response.data;
  },

  // Toplam kazançları getirir (tüm rezervasyonlardan elde edilen gelir)
  async getTotalEarnings() {
    const response = await axios.get(`${API_BASE_URL}/admin/dashboard/earnings`, getAuthHeaders());
    return response.data;
  },

  // Toplam rezervasyon sayısını getirir
  async getTotalReservations() {
    const response = await axios.get(`${API_BASE_URL}/admin/dashboard/reservations`, getAuthHeaders());
    return response.data;
  },

  // Toplam müşteri sayısını getirir (CUSTOMER rolündeki kullanıcılar)
  async getTotalCustomers() {
    const response = await axios.get(`${API_BASE_URL}/admin/dashboard/customers`, getAuthHeaders());
    return response.data;
  },

  // Toplam aktif otel sayısını getirir
  async getTotalHotels() {
    const response = await axios.get(`${API_BASE_URL}/admin/dashboard/hotels`, getAuthHeaders());
    return response.data;
  },

  // Tüm otelleri getirir (admin paneli için)
  async getAllHotels() {
    const response = await axios.get(`${API_BASE_URL}/hotels`, {
      ...getAuthHeaders(),
      params: {
        limit: 500, // Tüm otelleri getirmek için yüksek limit
        page: 1,
        isActive: true // Sadece aktif otelleri getir
      }
    });
    return response.data;
  },

  async getAllUsers() {
    const response = await axios.get(`${API_BASE_URL}/users`, getAuthHeaders());
    return response.data;
  },

  async getUserById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/users/id/${id}`, getAuthHeaders());
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, getAuthHeaders());
    return response.data;
  },

  // Hotel CRUD Operations
  async getHotelById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/hotels/${id}`, getAuthHeaders());
    return response.data;
  },

  async updateHotel(id: string, data: UpdateHotelDto) {
    const response = await axios.put(`${API_BASE_URL}/hotels/${id}`, data, getAuthHeaders());
    return response.data;
  },

  async deleteHotel(id: string) {
    const response = await axios.delete(`${API_BASE_URL}/hotels/${id}`, getAuthHeaders());
    return response.data;
  },

  async createHotel(data: CreateHotelDto) {
    const response = await axios.post(`${API_BASE_URL}/hotels`, data, getAuthHeaders());
    return response.data;
  },

  // User CRUD Operations with Pagination
  async getAllUsersWithPagination(page: number = 1, limit: number = 10, search?: string, role?: string) {
    const params: Record<string, string | number> = { page, limit };
    if (search) params.search = search;
    if (role) params.role = role;
    
    const response = await axios.get(`${API_BASE_URL}/users`, {
      ...getAuthHeaders(),
      params
    });
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserDto) {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, data, getAuthHeaders());
    return response.data;
  },

  // Hotel Operations with Pagination
  async getAllHotelsWithPagination(page: number = 1, limit: number = 10, search?: string, isActive?: boolean) {
    const params: Record<string, string | number | boolean> = { page, limit };
    if (search) params.search = search;
    if (typeof isActive === 'boolean') params.isActive = isActive;
    
    const response = await axios.get(`${API_BASE_URL}/hotels`, {
      ...getAuthHeaders(),
      params
    });
    return response.data;
  },

  // Company Profile Operations
  async updateCompanyProfile(data: UpdateAdminProfileDto) {
    const response = await axios.put(`${API_BASE_URL}/admin/profile`, data, getAuthHeaders());
    return response.data;
  }
};