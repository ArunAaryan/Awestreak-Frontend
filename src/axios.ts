import axios from "axios";

import { API_URL } from "../config";

const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: getCurrentUser(),
  },
});

export default axiosClient;
