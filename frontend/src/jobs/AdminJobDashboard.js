import React, { useContext, useEffect, useState } from "react";
import { getJobs, deleteJob } from "../services/jobService";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminJobDashboard() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await getJobs();
        const myJobs = res.data.filter((job) => job.posted_by === user.id);
        setJobs(myJobs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading your jobs...</p>
      </div>
    );

  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1596496050623-daa3467a1eb5?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h2 className="text-center text-white mb-5">My Posted Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-center text-white">No jobs posted yet.</p>
        ) : (
          <div className="row g-4">
            {jobs.map((job) => (
              <div key={job.id} className="col-md-6 col-lg-4">
                <div
                  className="card shadow-sm h-100"
                  style={{
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "12px",
                    padding: "20px",
                  }}
                >
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text">{job.location}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/edit-job/${job.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminJobDashboard;
