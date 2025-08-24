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

  if (loading) return <p>Loading your jobs...</p>;

  return (
    <div>
      <h2>My Posted Jobs</h2>
      {jobs.length === 0 ? <p>No jobs posted yet.</p> : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <Link to={`/jobs/${job.id}`}>{job.title}</Link> — {job.company}
              <div>
                <Link to={`/edit-job/${job.id}`}>Edit</Link> | 
                <button onClick={() => handleDelete(job.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminJobDashboard;
