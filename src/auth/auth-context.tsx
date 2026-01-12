"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

export interface AuthContextType {
  jwt: string | null;
  fetchNewJwt: () => Promise<string | null>;
  removeJwt: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const disableAuth = process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

  // In dev mode we expose a stable fake token so components/hooks that depend
  // on a JWT can just run without redirecting to login.
  const [jwt, setJwt] = useState<string | null>(
    disableAuth ? "dev-jwt-token" : null
  );

  const router = useRouter();
  const path = usePathname();

  // Simple fetchNewJwt implementation: when auth is disabled it's a noop that returns the dev token.
  const fetchNewJwt = async (): Promise<string | null> => {
    if (disableAuth) return "dev-jwt-token";

    // ...existing real refresh-token logic would go here...
    // return await realRefreshOrNull();
    return null;
  };

  const removeJwt = () => {
    if (disableAuth) {
      // keep dev token when auth disabled
      return;
    }
    setJwt(null);
    // ...existing code to remove cookie/localStorage...
  };

  useEffect(() => {
    if (disableAuth) {
      // Ensure dev token stays set while in dev-mode
      setJwt((v) => v ?? "dev-jwt-token");
      return;
    }

    // ...existing initialization logic (read cookie / validate / redirect) ...
    // e.g. check cookies, call fetchNewJwt if needed, redirect when not authenticated
  }, [disableAuth, router, path]);

  return (
    <AuthContext.Provider value={{ jwt, fetchNewJwt, removeJwt }}>
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
