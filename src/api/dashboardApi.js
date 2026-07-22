import axiosInstance from "./axios";

/**
 * Get Dashboard Statistics
 */
export const getDashboard = async () => {
  const response = await axiosInstance.get("/dashboard");
  return response.data;
};