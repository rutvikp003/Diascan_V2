import axios from "axios";

// Create Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change it to match your backend URL
});

// Automatically add JWT token to every request (If user is logged in)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
