import axiosInstance from "./axios";

export const getAnalytics = async () => {

  const response =
    await axiosInstance.get("/analytics");

  return response.data;

};