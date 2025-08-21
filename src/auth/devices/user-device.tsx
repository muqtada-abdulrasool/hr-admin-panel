"use client";

import { useAuthContext } from "../auth-context";
import { getData } from "@/auth/fetch-types/get";
import { useState, useCallback } from "react";
import { UserBody } from "@/interface/user";
import { postData } from "../fetch-types/post";

export function useUserApi() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(undefined);
  const auth = useAuthContext();
  const jwt = auth?.jwt;
  const fetchNewJwt = auth?.fetchNewJwt;

  const getUser = useCallback(
    (
      userID: string = "0",
      page: number = 1,
      pageSize: number = 10,
      email: string = ""
    ) => {
      const params = new URLSearchParams({
        userID,
        page: page.toString(),
        pageSize: pageSize.toString(),
        email,
      }).toString();
      setLoading(true);
      if (jwt) {
        getData(
          jwt,
          setLoading,
          (data: any) => setUserData(data),
          fetchNewJwt,
          `api/User?${params}`
        );
      }
    },
    [jwt, fetchNewJwt]
  );

  const createUser = useCallback(
    (email: string = "0", password: string = "0") => {
      const body: UserBody = {
        email: email,
        password: password,
      };

      if (jwt) {
        setLoading(true);
        postData(jwt, setLoading, fetchNewJwt, body, "api/User");
      }
    },
    [jwt, fetchNewJwt]
  );

  return {
    loading,
    userData,
    getUser,
    createUser,
  };
}
