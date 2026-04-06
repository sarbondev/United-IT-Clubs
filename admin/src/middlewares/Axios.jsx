import axios from "axios";
import { API_URL } from "../lib/config";

export const Axios = axios.create({
  baseURL: API_URL,
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("uitctoken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
