import axiosInstance from "./axios";

/**
 * Get all tasks of logged-in user
 */
export const getAllTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

/**
 * Get task by id
 */
export const getTaskById = async (id) => {
  const response = await axiosInstance.get(`/tasks/${id}`);
  return response.data;
};

/**
 * Create new task
 */
export const createTask = async (task) => {
  const response = await axiosInstance.post("/tasks", task);
  return response.data;
};

/**
 * Update task
 */
export const updateTask = async (id, task) => {
  const response = await axiosInstance.put(`/tasks/${id}`, task);
  return response.data;
};

/**
 * Delete task
 */
export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};

/**
 * Mark task as completed
 */
export const completeTask = async (id) => {
  const response = await axiosInstance.put(`/tasks/${id}/complete`);
  return response.data;
};

/**
 * Update task progress
 */
export const updateTaskProgress = async (id, progress) => {
  const response = await axiosInstance.put(
    `/tasks/${id}/progress/${progress}`
  );
  return response.data;
};

/**
 * Completed tasks
 */
export const getCompletedTasks = async () => {
  const response = await axiosInstance.get("/tasks/completed");
  return response.data;
};

/**
 * Pending tasks
 */
export const getPendingTasks = async () => {
  const response = await axiosInstance.get("/tasks/pending");
  return response.data;
};

/**
 * Search tasks
 */
export const searchTasks = async (keyword) => {
  const response = await axiosInstance.get("/tasks/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

/**
 * Today's tasks
 */
export const getTodayTasks = async () => {
  const response = await axiosInstance.get("/tasks/today");
  return response.data;
};

/**
 * Sort tasks by due date
 */
export const getSortedTasks = async () => {
  const response = await axiosInstance.get("/tasks/sort");
  return response.data;
};

/**
 * Latest tasks
 */
export const getLatestTasks = async () => {
  const response = await axiosInstance.get("/tasks/latest");
  return response.data;
};

/**
 * Pagination
 */
export const getTaskPage = async (page, size) => {
  const response = await axiosInstance.get("/tasks/page", {
    params: {
      page,
      size,
    },
  });

  return response.data;
};