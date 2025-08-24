import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobService";
import { getApplications } from "../services/applicationService";
import { AuthContext } from "../context/AuthContext";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getJobById(id);
        setJob(res.data);

        if (user?.user_type === "jobseeker") {
          const apps = await getApplications();
          const hasApplied = apps.data.some(app => app.job_id === res.data.id);
          setApplied(hasApplied);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, user]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2>{job.title}</h2>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Salary Range:</b> {job.salary_range}</p>
      <p><b>Description:</b> {job.description}</p>
      <p><b>Posted by:</b> {job.posted_by_name}</p>

      {user?.user_type === "jobseeker" && (
        !applied ? (
          <button onClick={() => navigate(`/apply/${id}`)}>Apply Job</button>
        ) : (
          <p style={{ color: "green" }}>✅ You have already applied for this job.</p>
        )
      )}
    </div>
  );
}

export default JobDetail;
