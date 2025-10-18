import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5215/api",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Security headers like CSP should be configured on the server responses, not client requests
  },
});

// Attach Authorization header if we have a token in localStorage
axiosClient.interceptors.request.use((config) => {
  try {
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore storage errors
  }
  return config;
});

export default axiosClient;
