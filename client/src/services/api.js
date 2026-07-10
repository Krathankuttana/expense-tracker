import axios from "axios";

export const getApiErrorMessage = (error, fallback = "Something went wrong") => {
  const data = error.response?.data;

  if (data?.message && Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((item) => item.message).join(", ");
  }

  if (data?.message) return data.message;

  if (error.code === "ERR_NETWORK") {
    return "Cannot reach the server. Check that the backend is running and VITE_API_URL is correct.";
  }

  return fallback;
};

// Base axios instance shared by all services. baseURL comes from Vite's
// env variables so it can point at localhost in dev and the deployed
// Render URL in production.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  withCredentials: true,
});

// Attach the JWT token (if we have one) to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Globally handle expired/invalid sessions
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
