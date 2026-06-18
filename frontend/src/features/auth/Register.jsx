import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import Button from "../../components/layout/Button";

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
      <div className="auth-card">
        <h2>Create account</h2>
        <p className="auth-subtitle">
          Register to start managing your own tasks.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {successMessage && (
          <p className="form-message success">{successMessage}</p>
        )}

        {error && <p className="form-message error">{error}</p>}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
