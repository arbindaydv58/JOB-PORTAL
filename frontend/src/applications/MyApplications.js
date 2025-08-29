// import React, { useEffect, useState } from "react";
// import { getApplications, withdrawApplication } from "../services/applicationService";

// function MyApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await getApplications();
//       const apps =
//         Array.isArray(res?.data?.data)
//           ? res.data.data
//           : Array.isArray(res?.data?.data?.applications)
//           ? res.data.data.applications
//           : [];
//       setApplications(apps);
//     } catch (err) {
//       setError(err?.message || "Failed to fetch applications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWithdraw = async (appId) => {
//     try {
//       await withdrawApplication(appId);
//       // Refresh the list after withdraw
//       fetchApplications();
//     } catch (err) {
//       alert(err?.message || "Failed to withdraw application");
//     }
//   };

//   if (loading) return <p>Loading applications...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!applications.length) return <p>No applications found.</p>;

//   return (
//     <div>
//       <h2>My Applications</h2>
//       {applications.map((app) => (
//         <div key={app.id || Math.random()} className="application-card">
//           <h4>{app.job_title || "No Job Title"}</h4>
//           <p>Status: {app.status || "Unknown"}</p>
//           <p>Cover Letter: {app.cover_letter || "N/A"}</p>
//           <button onClick={() => handleWithdraw(app.id)}>Withdraw</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyApplications;

import React, { useEffect, useState } from "react";
import { getApplications, withdrawApplication } from "../services/applicationService";

function MyApplications() {
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
      const apps = Array.isArray(res.data) ? res.data : res.data.applications || [];
      setApplications(apps);
    } catch (err) {
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
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Applications</h2>
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
          <h3 style={{ marginBottom: "10px" }}>{app.job_title}</h3>
          <p>
            <b>Status:</b>{" "}
            <span style={{ color: getStatusColor(app.status), fontWeight: "bold" }}>
              {app.status || "Pending"}
            </span>
          </p>
          <p><b>Cover Letter:</b> {app.cover_letter || "N/A"}</p>
          <p><b>Applied At:</b> {new Date(app.applied_at).toLocaleString()}</p>
          
          {/* CV Download Link */}
          {app.cv_file && (
            <p>
              <b>CV:</b>{" "}
              <a
                href={app.cv_file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1e90ff" }}
              >
                View / Download
              </a>
            </p>
          )}

          <button
            onClick={() => handleWithdraw(app.id)}
            style={{
              marginTop: "10px",
              padding: "8px 15px",
              borderRadius: "5px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Withdraw
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;



