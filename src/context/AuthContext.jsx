import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const isLoggedIn = !!currentUser;
  const isAdmin = !!currentUser && currentUser.role === "admin";

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("user");
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch (e) {
        setCurrentUser(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (user) => {
    
    const toStore = {
      name: user?.name || "User",
      email: user?.email || "",
      role: user?.role === "admin" ? "admin" : "user",
    };
    localStorage.setItem("user", JSON.stringify(toStore));
    setCurrentUser(toStore);
    if (toStore.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user/1");
    }
  };

  const updateUser = (updates) => {
    const next = { ...(currentUser || {}), ...updates };
    localStorage.setItem("user", JSON.stringify(next));
    setCurrentUser(next);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
