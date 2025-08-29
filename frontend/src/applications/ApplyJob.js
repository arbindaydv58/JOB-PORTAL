// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { createApplication } from "../services/applicationService";

// function ApplyJob() {
//   const { jobId } = useParams();
//   const [coverLetter, setCoverLetter] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     try {
//       await createApplication({ job_id: jobId, cover_letter: coverLetter });
//       setMessage("✅ Application submitted successfully!");
//       setCoverLetter("");
//       setTimeout(() => navigate("/my-applications"), 1200);
//     } catch (err) {
//       setMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
//       <h2>Apply for Job</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           placeholder="Write your cover letter..."
//           value={coverLetter}
//           onChange={(e) => setCoverLetter(e.target.value)}
//           required
//           style={{ width: "100%", height: "150px", marginBottom: "15px", padding: "10px" }}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//       {message && (
//         <p style={{ marginTop: "10px", color: message.includes("success") ? "green" : "red" }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }

// export default ApplyJob;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createApplication } from "../services/applicationService";

function ApplyJob() {
  const { jobId } = useParams();
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState(null); // new state for CV
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!cvFile) {
      setMessage("❌ Please upload your CV");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("job_id", jobId);
      formData.append("cover_letter", coverLetter);
      formData.append("cv", cvFile); // must match backend field name

      const res = await createApplication(formData);
      console.log("Created application:", res.data);

      setMessage("✅ Application submitted successfully!");
      setCoverLetter("");
      setCvFile(null);

      // Navigate after a short delay to ensure backend has saved
      setTimeout(() => navigate("/my-applications"), 500);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Failed to apply");
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
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          style={{ marginBottom: "15px" }}
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

