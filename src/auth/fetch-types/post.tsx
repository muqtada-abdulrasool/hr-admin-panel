export const postData = async (
  jwt: string | null | undefined,
  setLoading: any,
  fetchNewJwt: any,
  body: any,
  pathAndParams: string,
  contentType = "application/json"
) => {
  setLoading(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const makeRequest = async (token: string | null | undefined) => {
    try {
      const headers: any = {
        Authorization: `bearer ${token}`,
      };

      if (contentType === "application/json") {
        headers["Content-Type"] = contentType;
      }

      const url = apiUrl.startsWith("http")
        ? `${apiUrl}/${pathAndParams}`
        : `/${pathAndParams}`;

      const requestBody =
        contentType === "application/json" && typeof body !== "string"
          ? JSON.stringify(body)
          : body;

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: requestBody,
      });

      if (response.status === 401) {
        const newJwt = await fetchNewJwt();
        if (newJwt) {
          return await makeRequest(newJwt);
        } else {
          throw new Error("JWT expired and could not refresh");
        }
      }

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err: any) {
      console.warn("postData error:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  return await makeRequest(jwt);
};
