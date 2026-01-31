"use client";

import LoadingOverlay from "@/components/shared/LoadingOverlay";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// 1. Initialize the context first (This removes the "cannot find name" error)
const AuthDataContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // These match your current logic for reading from storage
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("userName");
    const savedRole = localStorage.getItem("userRole");

    if (token && savedUser) {
      setUser({ name: savedUser, role: savedRole });
    }
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    setUser(null);
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    // 2. Use the variable we defined at the top
    <AuthDataContext.Provider value={{ user, setUser, isLoading, logout }}>
      {isLoading && <LoadingOverlay />}
      {children}
    </AuthDataContext.Provider>
  );
};

// 3. Export the hook so your Navbar can use it
export const useAuth = () => {
  const context = useContext(AuthDataContext);
  return context;
};
