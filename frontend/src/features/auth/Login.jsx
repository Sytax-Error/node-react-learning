import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Message from "../../components/ui/Message";

function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");

    try {
      await login(formData);
      setSuccessMessage("Login successful");
      setFormData({
        email: "",
        password: "",
      });
      navigate("/tasks");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Login to manage your tasks securely.</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Message type="success">{successMessage}</Message>
        <Message type="error">{error}</Message>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
