import axios from "axios";

import { API_URL } from "../config";

const getCurrentUser = () => {
  console.log("getCurrentUser", localStorage.getItem("currentUser"));
  return localStorage.getItem("currentUser");
};
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: getCurrentUser(),
  },
});

export default axiosClient;
