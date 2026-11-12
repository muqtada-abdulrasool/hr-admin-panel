import { LoginBody } from "@/interface/login";
import Cookies from "js-cookie";

export async function login(
  accountName: string,
  password: string,
  deviceID: string = "string",
  setLoading: any
) {
  setLoading(true);
  const isOffline = process.env.NEXT_PUBLIC_OFFLINE_MODE === "true";
  const body: LoginBody = {
    email: accountName || process.env.NEXT_PUBLIC_TEST_EMAIL || "admin@example.com",
    password: password || process.env.NEXT_PUBLIC_TEST_PASSWORD || "P@ssword12345",
    deviceID: deviceID || "browser-device",
  };
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const fetchUrl = apiUrl.startsWith("http") ? `${apiUrl}/api/Auth` : "/api/Auth";

    const response = await fetch(fetchUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });

    const JSONBody = await response.json();

    if (JSONBody && JSONBody.statusCode === 200) {
      if (JSONBody.data?.userID) {
        Cookies.set("userID", JSONBody.data.userID, { expires: 7 });
      }
      if (JSONBody.data?.refreshToken) {
        Cookies.set("refreshToken", JSONBody.data.refreshToken, { expires: 7 });
      }
      return JSONBody;
    }
    return JSONBody || { statusCode: response.status, errorMessage: "Authentication failed" };
  } catch (error) {
    console.warn("Login request failed, fallback to offline check:", error);
    if (isOffline) {
      const mockResult = {
        statusCode: 200,
        data: {
          userID: "1",
          refreshToken: "offline-mock-refresh-token",
          jwt: "offline-mock-jwt-token",
        },
        message: "Logged in via offline mode fallback",
      };
      Cookies.set("userID", mockResult.data.userID, { expires: 7 });
      Cookies.set("refreshToken", mockResult.data.refreshToken, { expires: 7 });
      return mockResult;
    }
    return {
      statusCode: 500,
      errorMessage: "Could not reach authentication server.",
    };
  } finally {
    setLoading(false);
  }
}
