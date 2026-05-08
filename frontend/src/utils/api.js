import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// CREATE CERTIFICATE
export const createCertificate = async (data) => {
  const response = await API.post(
    "/certificates",
    data
  );

  return response;
};

// GET ALL CERTIFICATES
export const getAllCertificates =
  async () => {
    const response = await API.get(
      "/certificates"
    );

    return response.data;
  };

// GET SINGLE CERTIFICATE
export const getCertificateById =
  async (id) => {
    const response = await API.get(
      `/certificates/${id}`
    );

    return response.data;
  };

// DELETE CERTIFICATE
export const deleteCertificate =
  async (id) => {
    const response = await API.delete(
      `/certificates/${id}`
    );

    return response.data;
  };

export default API;