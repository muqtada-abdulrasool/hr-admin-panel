export const patchData = async (
  jwt: string | null | undefined,
  setLoading: any,
  fetchNewJwt: any,
  body: any,
  pathAndParams: string,
  contentType = "application/json"
) => {
  setLoading(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const makeRequest = async (token: string | null | undefined) => {
    try {
      const headers: any = {
        Authorization: `bearer ${token}`,
      };

      if (contentType === "application/json") {
        headers["Content-Type"] = contentType;
      }

      const response = await fetch(`${apiUrl}/${pathAndParams}`, {
        method: "PATCH",
        credentials: "include",
        headers: headers,
        body: contentType == "application/json" ? JSON.stringify(body) : body,
      });

      if (response.status === 401) {
        const newJwt = await fetchNewJwt();
        if (newJwt) {
          return await makeRequest(newJwt);
        } else {
          throw new Error("JWT expired and could not refresh");
        }
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error("Error in createAccount:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return await makeRequest(jwt);
};
