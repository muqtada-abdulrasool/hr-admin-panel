import { useState, useEffect } from "react";
import { getData } from "@/auth/fetch-types/get";
import { useAuthContext } from "../auth-context";
import { UserBody } from "@/interface/user";
import { postData } from "../fetch-types/post";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const auth = useAuthContext();
  const jwt = auth.jwt;
  const fetchNewJwt = auth.fetchNewJwt;

  return {
    loading,
    getUsers(
      userID: string = "0",
      page: number = 1,
      pageSize: number = 10,
      email: string = ""
    ) {
      const [userData, setUserData] = useState<any>(undefined);
      const params = new URLSearchParams({
        userID,
        page: page.toString(),
        pageSize: pageSize.toString(),
        email,
      }).toString();

      useEffect(() => {
        if (jwt) {
          getData(
            jwt,
            setLoading,
            (data: any) => setUserData(data),
            fetchNewJwt,
            `api/User?${params}`
          );
        }
      }, [jwt, userData, userID]);

      return userData;
    },
    createUsers(email: string = "0", password: string = "0") {
      const body: UserBody = {
        email: email,
        password: password,
      };

      useEffect(() => {
        if (jwt) {
          postData(
            jwt,
            setLoading,
            fetchNewJwt,
            JSON.stringify(body),
            "api/User"
          );
        }
      }, [jwt, email, password]);
    },
  };
}
