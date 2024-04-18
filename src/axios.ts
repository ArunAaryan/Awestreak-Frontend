import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { API_URL } from "../config";

const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: "Bearer " + getCurrentUser(),
  },
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("axios error");
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.href = `${import.meta.env.REACT_APP_API_URL}/auth/google`;
    }
  }
);
export default axiosClient;
