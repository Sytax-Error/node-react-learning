import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

const API_BASE_URL = "http://localhost:5000";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/users`);
      const data = await response.json();
      console.log("data:", data);

      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !role.trim()) {
      alert("name and role are required.");
      return;
    }
    try {
      if (editUserId) {
        const response = await fetch(
          `http://localhost:5000/api/users/${editUserId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              role: role,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Something went wrong");
          return;
        }

        setUsers(
          users.map((user) => (user.id === editUserId ? data.user : user)),
        );

        setName("");
        setRole("");
        setEditUserId(null);

        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          role: role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      console.log(data);

      setUsers([...users, data.user]);

      setName("");
      setRole("");
    } catch (error) {
      alert("Failed to save user");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setName(user.name);
    setRole(user.role);
  };
  const handleCancelEdit = () => {
    setEditUserId(null);
    setName("");
    setRole("");
  };

  return (
    <div>
      <h1>Users List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">{editUserId ? "Update User" : "Add User"}</button>
      </form>
      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      {users.length === 0 && !loading && !error && <p>No users found</p>}

      {users?.map((user) => (
        <div key={user?.id}>
          <h3>{user?.name}</h3>
          <p>{user?.role}</p>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleCancelEdit()}>Cancel Edit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
