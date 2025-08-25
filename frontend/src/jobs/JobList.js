// import React, { useEffect, useState } from "react";
// import { getJobs } from "../services/jobService";
// import { Link } from "react-router-dom";

// function JobList() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         const res = await getJobs();
//         setJobs(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchJobs();
//   }, []);

//   if (loading) return <p>Loading jobs...</p>;

//   return (
//     <div>
//       <h2>Available Jobs</h2>
//       {jobs.length === 0 ? (
//         <p>No jobs available</p>
//       ) : (
//         <ul>
//           {jobs.map((job) => (
//             <li key={job.id}>
//               <Link to={`/jobs/${job.id}`}>{job.title}</Link> — {job.company}
//               <p>
//                 Posted by: <b>{job.posted_by_name}</b>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default JobList;

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

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading jobs...</p>
      </div>
    );

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1554774853-bc6c7d1e90c8?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1200px",
        }}
      >
        <h2 className="text-center text-white mb-5">Available Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-center text-white">No jobs available</p>
        ) : (
          <div className="row g-4">
            {jobs.map((job) => (
              <div key={job.id} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 shadow"
                  style={{
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "12px",
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                    <p className="card-text mt-auto">
                      Posted by: <b>{job.posted_by_name}</b>
                    </p>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="btn btn-primary mt-2"
                    >
                      View Details
                    </Link>
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

export default JobList;


