"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export interface AuthContextType {
  jwt: string | null;
  fetchNewJwt: () => Promise<string | null>;
  removeJwt: () => void;
  isOffline: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isOffline =
    process.env.NEXT_PUBLIC_OFFLINE_MODE === "true" ||
    process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

  const [jwt, setJwt] = useState<string | null>(
    isOffline ? "offline-mock-jwt-token" : null
  );

  const router = useRouter();
  const path = usePathname();

  const fetchNewJwt = async (): Promise<string | null> => {
    if (isOffline) return "offline-mock-jwt-token";
    return null;
  };

  const removeJwt = () => {
    setJwt(null);
    Cookies.remove("userID");
    Cookies.remove("refreshToken");
  };

  useEffect(() => {
    if (isOffline) {
      if (!Cookies.get("userID")) {
        Cookies.set("userID", "1", { expires: 7 });
      }
      if (!Cookies.get("refreshToken")) {
        Cookies.set("refreshToken", "offline-mock-refresh-token", { expires: 7 });
      }
      setJwt((v) => v ?? "offline-mock-jwt-token");
    } else {
      const existingUser = Cookies.get("userID");
      if (existingUser) {
        setJwt((v) => v ?? "session-jwt-token");
      }
    }
  }, [isOffline, router, path]);

  return (
    <AuthContext.Provider value={{ jwt, fetchNewJwt, removeJwt, isOffline }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
};
