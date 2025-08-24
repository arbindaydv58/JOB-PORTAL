import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="navbar-left">
        <span className="logo" onClick={() => navigate("/")}>
          HireHub
        </span>
      </div>

      {/* Center - Navigation Links */}
      <div className="navbar-center">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/company" className="nav-link">
          Company Reviews
        </NavLink>
        <NavLink to="/salary" className="nav-link">
          Find Salaries
        </NavLink>
        <NavLink to="/jobs" className="nav-link">
          Jobs
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </div>

      {/* Right - Auth Buttons */}
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="navbar-btn login-btn">
              Login
            </Link>
            <Link to="/signup" className="navbar-btn signup-btn">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* Show logged-in user */}
            <span className="user-info">
              Hi, {user.full_name || user.email}
            </span>

            {user.user_type === "admin" && (
              <>
                <Link to="/create-job" className="navbar-btn dashboard-btn">
                  Post Job
                </Link>
                <Link to="/admin/jobs" className="navbar-btn dashboard-btn">
                  Manage Jobs
                </Link>
                <Link
                  to="/admin/applications"
                  className="navbar-btn dashboard-btn"
                >
                  Admin Applications
                </Link>
              </>
            )}

            {user.user_type === "jobseeker" && (
              <Link to="/my-applications" className="navbar-btn dashboard-btn">
                My Applications
              </Link>
            )}

            <button onClick={logout} className="navbar-btn logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
