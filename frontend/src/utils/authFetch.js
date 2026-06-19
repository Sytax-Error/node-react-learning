import { API_BASE_URL } from "../config/api";

const getSavedAuth = () => {
  const savedAuth = localStorage.getItem("auth");
  return savedAuth ? JSON.parse(savedAuth) : null;
};

const saveAccessToken = (newAccessToken) => {
  const auth = getSavedAuth();

  if (!auth) {
    return;
  }

  const updatedAuth = {
    ...auth,
    accessToken: newAccessToken,
  };

  localStorage.setItem("auth", JSON.stringify(updatedAuth));
};

const refreshAccessToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to refresh token");
  }

  return data.data.accessToken;
};

export const authFetch = async (url, options = {}) => {
  const auth = getSavedAuth();
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

  if (response.ok) {
    return data;
  }

  if (response.status === 401 && !data.success) {
    try {
      const newAccessToken = await refreshAccessToken();

      saveAccessToken(newAccessToken);

      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      const retryData = await retryResponse.json();

      if (!retryResponse.ok) {
        throw new Error(retryData.message || "Something went wrong");
      }

      return retryData;
    } catch (error) {
      localStorage.removeItem("auth");
      window.location.href = "/login";

      throw new Error("Session expired. Please login again.", { cause: error });
    }
  }
};
