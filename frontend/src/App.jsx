import Login from "./features/auth/Login";
import Profile from "./features/auth/Profile";
import Register from "./features/auth/Register";
import { useAuth } from "./features/auth/AuthContext";
import TasksPage from "./features/tasks/TasksPage";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Frontend Auth Integration</h1>

      {isAuthenticated ? (
        <>
          <Profile />
          <hr />
          <TasksPage />
        </>
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
