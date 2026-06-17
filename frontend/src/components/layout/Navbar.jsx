import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

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
        <Link to="/">MERN Learning</Link>
      </div>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>

            <span className="navbar-user">{user?.name}</span>

            <button
              type="button"
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
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
