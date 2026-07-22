import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} from "../api/profileApi";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ================= LOAD PROFILE =================

  const loadProfile = async () => {

    try {

      setLoading(true);

      const data = await getProfile();

      setProfile(data);

      // Update localStorage for Navbar/AuthContext
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      setError("");

    } catch (err) {

      console.error(err);

      setError("Unable to load profile.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (localStorage.getItem("token")) {

      loadProfile();

    }

  }, []);

  // ================= UPDATE PROFILE =================

  const saveProfile = async (profileData) => {

    try {

      setLoading(true);

      const data = await updateProfile(profileData);

      setProfile(data);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      setError("");

      return data;

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to update profile."
      );

      throw err;

    } finally {

      setLoading(false);

    }

  };

  // ================= CHANGE PASSWORD =================

  const updateUserPassword = async (passwordData) => {

    try {

      setLoading(true);

      const message =
        await changePassword(passwordData);

      setError("");

      return message;

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to change password."
      );

      throw err;

    } finally {

      setLoading(false);

    }

  };

  // ================= UPLOAD IMAGE =================

  const saveProfileImage = async (file) => {

    try {

      setLoading(true);

      const data =
        await uploadProfileImage(file);

      setProfile(data);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      setError("");

      return data;

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to upload image."
      );

      throw err;

    } finally {

      setLoading(false);

    }

  };

  return (

    <ProfileContext.Provider
      value={{

        profile,

        loading,

        error,

        loadProfile,

        saveProfile,

        updateUserPassword,

        saveProfileImage,

      }}
    >

      {children}

    </ProfileContext.Provider>

  );

}

export function useProfile() {

  return useContext(ProfileContext);

}