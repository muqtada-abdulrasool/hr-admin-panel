import { useEffect } from "react";
import { useAuthContext } from "./auth-context";

export default async function CheckJWT() {
  const auth = useAuthContext();
  const jwt = auth?.jwt;
  const fetchNewJwt = auth?.fetchNewJwt;

  useEffect(() => {}, [jwt]);
}
