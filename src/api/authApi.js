import axiosInstance from "./axios";

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://elevatebackend-dcct.onrender.com/api";

export const loginWithGoogle = () => {
  window.location.href = `${API_BASE.replace("/api", "")}/oauth2/authorization/google`;
};

export const loginWithGithub = () => {
  window.location.href = `${API_BASE.replace("/api", "")}/oauth2/authorization/github`;
};