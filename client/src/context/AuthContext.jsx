import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useGlobalMessage } from "./GlobalMessageContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setGlobalMessage } = useGlobalMessage();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/user");
      let userData = res.data.user;

      if (["amansolutions24@gmail.com"].includes(userData.email)) {
        userData = { ...userData, role: "admin" };
      }

      setUser(userData);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchUser();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const loginUser = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);
      await fetchUser();

      setGlobalMessage({ type: "success", text: "Logged in successfully" });

      if (email === "amansolutions24@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      return true;
    } catch (error) {
      setGlobalMessage({
        type: "error",
        text: error.response?.data?.msg || "Login failed",
      });
      return false;
    }
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      await api.post("/auth/register", { name, email, password });
      setGlobalMessage({ type: "success", text: "Registered successfully" });
      return true;
    } catch (error) {
      setGlobalMessage({
        type: "error",
        text: error.response?.data?.msg || "Registration failed",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setGlobalMessage({ type: "success", text: "Logged out successfully" });
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
