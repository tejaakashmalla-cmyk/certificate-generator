/**
 * API Utility
 * Centralized axios instance for all API calls
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Attach token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Certificate APIs ─────────────────────────────────────────────────────────
export const createCertificate = (data) => api.post('/certificates', data);
export const getAllCertificates = (search = '') =>
  api.get('/certificates', { params: { search } });
export const getCertificateById = (id) => api.get(`/certificates/${id}`);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

// ─── Auth APIs ────────────────────────────────────────────────────────────────
export const loginAdmin = (email, password) => api.post('/auth/login', { email, password });
export const setupAdmin = (data) => api.post('/auth/setup', data);

export default api;
