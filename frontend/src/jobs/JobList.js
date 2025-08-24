import React, { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { Link } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await getJobs();
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <Link to={`/jobs/${job.id}`}>{job.title}</Link> — {job.company}
              <p>
                Posted by: <b>{job.posted_by_name}</b>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;
