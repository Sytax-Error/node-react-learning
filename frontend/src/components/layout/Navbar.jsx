import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import Button from "../ui/Button";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="app-navbar">
      <div className="navbar-brand">
        <Link to="/">MERN</Link>
      </div>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>

            <span className="navbar-user">{user?.name}</span>

            <Button size="sm" variant="solid-danger" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
