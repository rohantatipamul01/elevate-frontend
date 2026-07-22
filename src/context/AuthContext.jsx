import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {

    loginWithGoogle,

    loginWithGithub

} from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (jwtToken, userData) => {
    localStorage.setItem("token", jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));

    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = useMemo(

  () => ({

    token,

    user,

    isAuthenticated: !!token,

    login,

    logout,

    loginWithGoogle,

    loginWithGithub,

  }),

  [token, user]

);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}