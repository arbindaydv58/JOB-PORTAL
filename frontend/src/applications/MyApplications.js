import React, { useEffect, useState } from "react";
import { getApplications, withdrawApplication } from "../services/applicationService";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getApplications();
      setApplications(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (appId) => {
    try {
      await withdrawApplication(appId);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (applications.length === 0) return <p>No applications found.</p>;

  return (
    <div>
      <h2>My Applications</h2>
      {applications.map((app) => (
        <div key={app.id} className="application-card">
          <h4>{app.job_title}</h4>
          <p>Status: {app.status}</p>
          <p>Cover Letter: {app.cover_letter}</p>
          <button onClick={() => handleWithdraw(app.id)}>Withdraw</button>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
