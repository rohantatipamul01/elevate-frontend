import axiosInstance from "./axios";

// ================= GET PROFILE =================

export const getProfile = async () => {

  const response = await axiosInstance.get(
    "/profile"
  );

  return response.data;

};

// ================= UPDATE PROFILE =================

export const updateProfile = async (profileData) => {

  const response = await axiosInstance.put(
    "/profile",
    profileData
  );

  return response.data;

};

// ================= CHANGE PASSWORD =================

export const changePassword = async (passwordData) => {

  const response = await axiosInstance.put(
    "/profile/password",
    passwordData
  );

  return response.data;

};

// ================= UPLOAD PROFILE IMAGE =================

export const uploadProfileImage = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await axiosInstance.post(

    "/profile/image",

    formData,

    {

      headers: {

        "Content-Type":
          "multipart/form-data",

      },

    }

  );

  return response.data;

};