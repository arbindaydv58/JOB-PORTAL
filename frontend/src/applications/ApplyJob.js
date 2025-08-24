import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createApplication } from "../services/applicationService";

function ApplyJob() {
  const { jobId } = useParams();
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await createApplication({ job_id: jobId, cover_letter: coverLetter });
      setMessage("✅ Application submitted successfully!");
      setTimeout(() => navigate("/my-applications"), 1200);
    } catch (err) {
      setMessage(err.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
          style={{ width: "100%", height: "150px", marginBottom: "15px", padding: "10px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "10px", color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ApplyJob;
