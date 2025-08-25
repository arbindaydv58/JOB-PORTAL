import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loading state if auth is still being checked
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If not logged in, redirect to login & remember the current path
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is restricted, check user role
  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
