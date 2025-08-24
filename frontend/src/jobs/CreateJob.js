import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobService";

function CreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary_range: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createJob(formData);
      setMessage(res.data.message || "Job created successfully");
      navigate("/admin/jobs"); // redirect to admin dashboard
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create New Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="salary_range"
          placeholder="Salary Range"
          value={formData.salary_range}
          onChange={handleChange}
        />
        <button type="submit">Create Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateJob;
