"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import Cookies from "js-cookie";

interface AuthContextType {
  jwt: string | null;
  fetchNewJwt: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const apiUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [jwt, setJwt] = useState(null);

  // const token = Cookies.get("refreshToken");
  // const userID = Cookies.get("userID");

  const token =
    "JpY2AlyhEW2u3gnv9cJJg8ATx0UQYQxf/4lzbBkBwUFjgwy4Tw16e1K8O/1DUxWId+ArUBQSaHmKWiZWNyjDsg==";
  const userID = "3";

  const fetchNewJwt = async () => {
    try {
      const response = await fetch(
        "http://" + process.env.NEXT_PUBLIC_PUBLIC_API_URL + "/api/Auth",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "X-Refresh-Token": token!,
            "X-User-ID": userID!,
          },
        }
      );
      // if (!response.ok) {
      //   if (response.status === 401) {
      //     if (window.location.pathname !== "/Login") {
      //       window.location.href = "/Login";
      //       console.log(window.location.href);
      //     }
      //     return;
      //   }
      //   // throw new Error(Error: "${response.statusText}");
      // }

      // const data = await response.json();
      // setJwt(data.data);

      console.log(response);
    } catch (err: any) {
      console.log(err);
    }
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

export const useAuthContext = () => useContext(AuthContext);
