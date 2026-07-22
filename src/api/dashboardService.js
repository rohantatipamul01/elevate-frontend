import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};

export const getTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
};

export const getNotifications = async () => {
    const response = await api.get("/notifications");
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/user/profile");
    return response.data;
};