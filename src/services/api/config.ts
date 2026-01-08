import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://185.201.8.209:8000/api/v1`,
});
export const axiosPublic = axios.create({
  baseURL: `http://185.201.8.209:8000/api/v1`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  config.params = config.params || {};
  if (!!token && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
