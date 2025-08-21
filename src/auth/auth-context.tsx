"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  jwt: string | null;
  fetchNewJwt: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [jwt, setJwt] = useState(null);
  const router = useRouter();
  const path = usePathname();

  const fetchNewJwt = async (): Promise<string | null> => {
    let token = Cookies.get("refreshToken");
    let userID = Cookies.get("userID");

    if (!token || !userID) {
      console.log("No refresh token or user ID found. Redirecting to login.");
      router.push("/login");
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/Auth",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "X-Refresh-Token": token!,
            "X-User-ID": userID!,
          },
        }
      );
      const JSONBody = await response.json();

      if (JSONBody.statusCode == 200) {
        setJwt(JSONBody.data);
        if (path == "/login") {
          router.push("/");
        }
        return jwt;
      } else if (JSONBody.statusCode == 401) {
        router.push("/login");
      }
    } catch (err: any) {
      console.log(err);
    }
    return null;
  };

  useEffect(() => {
    if (!jwt) {
      fetchNewJwt();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, fetchNewJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
