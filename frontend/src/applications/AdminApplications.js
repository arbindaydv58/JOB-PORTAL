import React, { useEffect, useState } from "react";
import {
  getApplications,
  withdrawApplication,
  updateApplication,
} from "../services/applicationService";

function AdminApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getApplications();
      console.log("Admin Applications response:", res.data);

      // ✅ backend returns array directly
      const apps = Array.isArray(res?.data) ? res.data : [];
      setApplications(apps);
    } catch (err) {
      console.error("Error fetching admin applications:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (appId) => {
    try {
      await withdrawApplication(appId);
      setApplications((prev) => prev.filter((app) => app.id !== appId));
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to withdraw application");
    }
  };

  const handleStatusUpdate = async (appId, status) => {
    try {
      await updateApplication(appId, status);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status } : app
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "green";
      case "rejected":
        return "red";
      case "pending":
      default:
        return "orange";
    }
  };

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!applications.length) return <p>No applications found.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>All Applications (Admin)</h2>
      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{app.job_title || "Unknown Job"}</h3>
          <p>
            <b>Status:</b>{" "}
            <span style={{ color: getStatusColor(app.status), fontWeight: "bold" }}>
              {app.status}
            </span>
          </p>
          <p><b>Applicant Name:</b> {app.applicant_name || "N/A"}</p>
          <p><b>Applicant Email:</b> {app.applicant_email || "N/A"}</p>
          <p><b>Applicant ID:</b> {app.applicant_id}</p>
          <p><b>Cover Letter:</b> {app.cover_letter}</p>
          <p><b>Applied At:</b> {new Date(app.applied_at).toLocaleString()}</p>

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => handleStatusUpdate(app.id, "accepted")}
              style={{
                padding: "8px 15px",
                borderRadius: "5px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                marginRight: "8px",
                cursor: "pointer",
              }}
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusUpdate(app.id, "rejected")}
              style={{
                padding: "8px 15px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                marginRight: "8px",
                cursor: "pointer",
              }}
            >
              Reject
            </button>
            <button
              onClick={() => handleWithdraw(app.id)}
              style={{
                padding: "8px 15px",
                borderRadius: "5px",
                backgroundColor: "#444",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminApplication;
