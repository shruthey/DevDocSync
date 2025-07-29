import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Updated to match our server

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Register new user
  async register(userData) {
    try {
      console.log("Registering user with data:", userData);
      console.log("Making request to:", `${API_BASE_URL}/auth/register`);

      const response = await apiClient.post("/auth/register", userData);
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error details:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      throw error.response?.data || error;
    }
  },

  // Login user
  async login(email, password) {
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const response = await apiClient.post("/auth/jwt/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, token_type } = response.data;

      // Store token
      localStorage.setItem("accessToken", access_token);

      // Get user profile
      const userResponse = await apiClient.get("/auth/me");
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      return userResponse.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout user
  async logout() {
    try {
      await apiClient.post("/auth/jwt/logout");
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update user profile
  async updateProfile(userData) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await apiClient.patch(`/users/${user.id}`, userData);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  },

  // Get stored user data
  getStoredUser() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },
};

export default apiClient;
