export const authFetch = async (url, options = {}) => {
  const savedAuth = localStorage.getItem("auth");
  const auth = savedAuth ? JSON.parse(savedAuth) : null;

  const accessToken = auth?.accessToken;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
