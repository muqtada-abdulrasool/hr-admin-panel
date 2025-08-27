import { useState, useEffect } from "react";
import { getData } from "@/auth/fetch-types/get";
import { AuthContextType, useAuthContext } from "../auth-context";
import { UserBody } from "@/interface/user";
import { postData } from "../fetch-types/post";

export default function useUser(jwt: any, fetchNewJwt: any) {
  const [loading, setLoading] = useState(true);

  return {
    loading,
    getUsers(
      userID: string = "0",
      page: number = 1,
      pageSize: number = 10,
      email: string = "",
      setData: any
    ) {
      const params = new URLSearchParams({
        userID,
        page: page.toString(),
        pageSize: pageSize.toString(),
        email,
      }).toString();

      getData(
        jwt,
        setLoading,
        (data: any) => setData(data),
        fetchNewJwt,
        `api/User?${params}`
      );
    },
    createUsers(email: string = "0", password: string = "0") {
      const body: UserBody = {
        email: email,
        password: password,
      };

      postData(jwt, setLoading, fetchNewJwt, JSON.stringify(body), "api/User");
    },
  };
}
