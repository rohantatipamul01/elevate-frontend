import axiosInstance from "./axios";

export const getCalendarEvents = async () => {
  const response = await axiosInstance.get("/calendar");
  return response.data;
};