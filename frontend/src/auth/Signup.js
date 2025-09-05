

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Signup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    user_type: "jobseeker",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      setMessage("Signup successful!");
    } catch (error) {
      setMessage("Error signing up. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h3 className="text-center mb-4">Create an Account</h3>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* User Type */}
          <div className="mb-3">
            <label htmlFor="userType" className="form-label">
              User Type
            </label>
            <select
              id="userType"
              className="form-select"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Agree to Terms & Conditions
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Already have account link */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login here
          </Link>
        </p>

        {/* Message */}
        {message && <p className="text-center mt-2 text-success">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;




