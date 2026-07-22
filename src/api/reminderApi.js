import axiosInstance from "./axios";

/**
 * Get All Reminders
 */
export const getReminders = async () => {
  const response = await axiosInstance.get("/reminders");
  return response.data;
};

/**
 * Get Reminder By Id
 */
export const getReminder = async (id) => {
  const response = await axiosInstance.get(`/reminders/${id}`);
  return response.data;
};

/**
 * Create Reminder
 */
export const createReminder = async (reminder) => {
  const response = await axiosInstance.post("/reminders", reminder);
  return response.data;
};

/**
 * Update Reminder
 */
export const updateReminder = async (id, reminder) => {
  const response = await axiosInstance.put(`/reminders/${id}`, reminder);
  return response.data;
};

/**
 * Delete Reminder
 */
export const deleteReminder = async (id) => {
  const response = await axiosInstance.delete(`/reminders/${id}`);
  return response.data;
};

/**
 * Mark Reminder Completed
 */
export const completeReminder = async (id) => {
  const response = await axiosInstance.put(`/reminders/${id}/complete`);
  return response.data;
};

/**
 * Today's Reminders
 */
export const todayReminders = async () => {
  const response = await axiosInstance.get("/reminders/today");
  return response.data;
};

/**
 * Total Reminders
 */
export const totalReminders = async () => {
  const response = await axiosInstance.get("/reminders/count");
  return response.data;
};

/**
 * Completed Reminders
 */
export const completedReminders = async () => {
  const response = await axiosInstance.get("/reminders/completed");
  return response.data;
};