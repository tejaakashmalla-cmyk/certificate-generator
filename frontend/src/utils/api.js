import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// CREATE CERTIFICATE
export const createCertificate = async (data) => {
  const response = await API.post("/api/certificates", data);
  return response.data;
};

// GET SINGLE CERTIFICATE
export const getCertificateById = async (id) => {
  const response = await API.get(`/api/certificates/${id}`);
  return response.data;
};

// GET ALL CERTIFICATES
export const getAllCertificates = async () => {
  const response = await API.get("/api/certificates");
  return response.data;
};

// DELETE CERTIFICATE
export const deleteCertificate = async (id) => {
  const response = await API.delete(`/api/certificates/${id}`);
  return response.data;
};

export default API;