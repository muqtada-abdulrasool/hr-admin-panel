import { LoginBody } from "@/interface/login";
import Cookies from "js-cookie";
import { useAuthContext } from "../auth-context";

export async function login(
  accountName: string,
  password: string,
  deviceID: string = "string",
  setLoading: any
) {
  setLoading(true);
  const body: LoginBody = {
    email: accountName,
    password: password,
    deviceID: deviceID,
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/Auth",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const JSONBody = await response.json();

    if (JSONBody.statusCode === 200) {
      Cookies.set("userID", JSONBody.data.userID, {});
      Cookies.set("refreshToken", JSONBody.data.refreshToken, {});
    }
    return JSONBody;
  } catch (error) {
  } finally {
    setLoading(false);
  }
}
