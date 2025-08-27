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
          Authorization: `bearer ${token}`,
          accept: "/",
        },
      });

      if (response.status === 401) {
        const newJwt = await fetchNewJwt();
        console.log("AHHH");
        if (newJwt) {
          return await makeRequest(newJwt);
        } else {
          throw new Error("JWT expired and could not refresh");
        }
      }

      const data = await response.json();
      setData(data.data);
    } finally {
      setLoading(false);
    }
  };

  return await makeRequest(jwt);
};
