

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "jobseeker",
  });
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      setMessage(res.data.message);

      if (res.data.user.user_type === "admin") navigate("/admin/jobs");
      else navigate("/jobs");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%", borderRadius: "15px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
          />
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Sign up here
          </Link>
        </div>

        {/* Message */}
        {message && <p className="text-center mt-3 text-danger">{message}</p>}
      </div>
    </div>
  );
}

export default Login;

