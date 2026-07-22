import axiosInstance from "./axios";

/**
 * Get All Habits
 */
export const getHabits = async () => {
  const response = await axiosInstance.get("/habits");
  return response.data;
};

/**
 * Get Habit By Id
 */
export const getHabit = async (id) => {
  const response = await axiosInstance.get(`/habits/${id}`);
  return response.data;
};

/**
 * Create Habit
 */
export const createHabit = async (habit) => {
  const response = await axiosInstance.post("/habits", habit);
  return response.data;
};

/**
 * Update Habit
 */
export const updateHabit = async (id, habit) => {
  const response = await axiosInstance.put(`/habits/${id}`, habit);
  return response.data;
};

/**
 * Delete Habit
 */
export const deleteHabit = async (id) => {
  const response = await axiosInstance.delete(`/habits/${id}`);
  return response.data;
};

/**
 * Complete Habit
 */
export const completeHabit = async (id) => {
  const response = await axiosInstance.put(`/habits/${id}/complete`);
  return response.data;
};

/**
 * Total Habits
 */
export const totalHabits = async () => {
  const response = await axiosInstance.get("/habits/count");
  return response.data;
};

/**
 * Active Habits
 */
export const activeHabits = async () => {
  const response = await axiosInstance.get("/habits/active");
  return response.data;
};

/**
 * Dashboard Habit Statistics
 */
export const getHabitDashboard = async () => {
  const response = await axiosInstance.get("/habits/dashboard");
  return response.data;
};