import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import paths from "../paths";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") ? true : false
  );
  const navigate = useNavigate();

  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "password123") {
      setIsAuthenticated(true);
      localStorage.setItem(
        "authToken",
        "gjgngkdskgnskdgnsklgnsdklgnskdgapojwfojreuihdkjnbvdsafnlfvnbvdfbglagnbfweygcfyusfgcfnawmfkcvaw"
      );

      navigate(paths.home);
    } else {
      toast.error("Invalid credentials");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
