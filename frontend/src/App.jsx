import Login from "./features/auth/Login";
import Profile from "./features/auth/Profile";
import Register from "./features/auth/Register";
import { useAuth } from "./features/auth/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Frontend Auth Integration</h1>

      {isAuthenticated ? (
        <Profile />
      ) : (
        <>
          <Register />
          <hr />
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
