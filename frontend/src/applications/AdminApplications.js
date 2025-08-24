import React, { useEffect, useState } from "react";
import { getApplications, updateApplication } from "../services/applicationService";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setError("");
    try {
      const res = await getApplications();
      setApplications(res.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (appId, status) => {
    try {
      await updateApplication(appId, status);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Applications for My Jobs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {applications.map((app) => (
        <div key={app.id} className="application-card">
          <h4>{app.job_title}</h4>
          <p>Applicant: {app.applicant_name} ({app.applicant_email})</p>
          <p>Status: {app.status}</p>
          <button onClick={() => handleUpdate(app.id, "reviewed")}>Review</button>
          <button onClick={() => handleUpdate(app.id, "accepted")}>Accept</button>
          <button onClick={() => handleUpdate(app.id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default AdminApplications;
