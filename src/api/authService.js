import api from "./api";

// Signup
export const signup = async (user) => {

    const response = await api.post("/auth/signup", user);

    return response.data;
};

// Login
export const login = async (credentials) => {

    const response = await api.post("/auth/login", credentials);

    return response.data;
};

// Logout
export const logout = () => {

    localStorage.removeItem("token");

};

// Check Login
export const isAuthenticated = () => {

    return localStorage.getItem("token") !== null;

};