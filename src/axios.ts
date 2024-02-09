import axios from "axios";

import { API_URL } from "../config";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: localStorage.getItem("currentUser"),
  },
});

export default axiosClient;
