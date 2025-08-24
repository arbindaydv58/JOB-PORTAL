import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./home/HomePage";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import AboutPage from "./about/AboutPage";
import CompanyPage from "./company/CompanyPage";
import JobList from "./jobs/JobList";
import JobDetail from "./jobs/JobDetail";
import CreateJob from "./jobs/CreateJob";
import AdminJobDashboard from "./jobs/AdminJobDashboard";
import EditJob from "./jobs/EditJob";
import NotFound from "./NotFound";
import MyApplications from "./applications/MyApplications";
import ApplyJob from "./applications/ApplyJob";
import AdminApplications from "./applications/AdminApplications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/applyjob/:jobId" element={<ApplyJob />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/admin/applications" element={<AdminApplications />} />

        {/* Admin-only routes */}
        <Route
          path="/create-job"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminJobDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);
