import axios from "axios";

const API = axios.create({
  baseURL:
    "https://certificate-generator-2-3qsf.onrender.com",
});

export const createCertificate = async (data) => {
  const response = await API.post(
    "/api/certificates",
    data
  );
  return response.data;
};

export const getCertificateById = async (id) => {
  const response = await API.get(
    `/api/certificates/${id}`
  );
  return response.data;
};

export const getAllCertificates = async () => {
  const response = await API.get(
    "/api/certificates"
  );
  return response.data;
};

export const deleteCertificate = async (id) => {
  const response = await API.delete(
    `/api/certificates/${id}`
  );
  return response.data;
};

export default API;