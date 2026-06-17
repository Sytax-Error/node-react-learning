import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return children;
}

export default PublicRoute;
