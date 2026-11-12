export const getData = async (
  jwt: string | null | undefined,
  setLoading: any,
  setData: any,
  fetchNewJwt: any,
  pathAndParams: string
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const makeRequest = async (token: string | null | undefined) => {
    try {
      const url = apiUrl.startsWith("http")
        ? `${apiUrl}/${pathAndParams}`
        : `/${pathAndParams}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `bearer ${token}`,
          accept: "application/json",
        },
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
        setData(data.data !== undefined ? data.data : data);
      }
    } catch (err) {
      console.warn("getData error:", err);
    } finally {
      setLoading(false);
    }
  };

  return await makeRequest(jwt);
};
