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

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading job details...</p>
      </div>
    );
  if (!job) return <p className="text-center mt-5">Job not found.</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-start py-5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581091870626-1c4d4f3d61c1?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "700px",
          width: "100%",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
        }}
      >
        <h2 className="mb-3">{job.title}</h2>
        <p><b>Company:</b> {job.company}</p>
        <p><b>Location:</b> {job.location}</p>
        <p><b>Salary Range:</b> {job.salary_range}</p>
        <p><b>Description:</b> {job.description}</p>
        <p><b>Posted by:</b> {job.posted_by_name}</p>

        {user?.user_type === "jobseeker" && (
          !applied ? (
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate(`/applyjob/${id}`)}
            >
              Apply Job
            </button>
          ) : (
            <p className="text-success mt-3">✅ You have already applied for this job.</p>
          )
        )}
      </div>
    </div>
  );
}

export default JobDetail;
