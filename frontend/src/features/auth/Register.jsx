import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Message from "../../components/ui/Message";
import Card from "../../components/ui/Card";

function Register() {
  const { register, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
      await register(formData);

      setSuccessMessage("Registration successful. Please login.");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2>Create account</h2>
        <p className="auth-subtitle">
          Register to start managing your own tasks.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />

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
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <Message type="success">{successMessage}</Message>
        <Message type="error">{error}</Message>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
