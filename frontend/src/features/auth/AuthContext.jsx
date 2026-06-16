import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser, registerUser } from "./authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const savedAuth = localStorage.getItem("auth");

  const [auth, setAuth] = useState(savedAuth ? JSON.parse(savedAuth) : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(formData);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);

      const authData = {
        user: data.user,
        accessToken: data.accessToken,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      setAuth(authData);

      return authData;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error.message);
    } finally {
      localStorage.removeItem("auth");
      setAuth(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        user: auth?.user || null,
        accessToken: auth?.accessToken || null,
        isAuthenticated: Boolean(auth?.accessToken),
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
