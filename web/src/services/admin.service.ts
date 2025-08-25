// Admin Servis Katmanı - Admin paneli için gerekli tüm API isteklerini yönetir

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Admin profil güncelleme için tip tanımı
interface UpdateAdminProfileDto {
  companyName?: string;
  companyTaxId?: string;
  country?: string;
  city?: string;
  state?: string;
  postCode?: string;
  fullAddress?: string;
}

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
    const response = await axios.delete(`${API_BASE_URL}/admin/users/${id}`, getAuthHeaders());
    return response.data;
  }
};