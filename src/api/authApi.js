import axiosInstance from "./axios";

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const loginWithGoogle = () => {

    window.location.href =
        "http://localhost:8084/oauth2/authorization/google";

};

export const loginWithGithub = () => {

    window.location.href =
        "http://localhost:8084/oauth2/authorization/github";

};