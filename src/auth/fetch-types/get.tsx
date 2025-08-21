export const getData = async (
  jwt: string | null | undefined,
  setLoading: any,
  setData: any,
  fetchNewJwt: any,
  pathAndParams: string
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const makeRequest = async (token: string | null | undefined) => {
    try {
      const response = await fetch(`${apiUrl}/${pathAndParams}`, {
        method: "GET",
        credentials: "include",
        headers: {
          accept: "/",
          Authorization: `bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === 401) {
        const newJwt = await fetchNewJwt();
        if (newJwt) {
          return await makeRequest(newJwt);
        } else {
          throw new Error("JWT expired and could not refresh");
        }
      }

      setData(data.data);
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  return await makeRequest(jwt);
};
