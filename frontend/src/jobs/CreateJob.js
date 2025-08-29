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
    <div
      className="d-flex justify-content-center align-items-start py-5"
      style={{
        backgroundImage:
          "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Ftalhealthcare.com%2Fnine-things-to-do-after-accepting-a-new-job%2F&psig=AOvVaw00IfLFpsPRrOyW--y4hUVD&ust=1756536975909000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJi2u6i4r48DFQAAAAAdAAAAABAE')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center mb-4">Create New Job</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
          />
          <input
            type="text"
            name="salary_range"
            placeholder="Salary Range"
            value={formData.salary_range}
            onChange={handleChange}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary w-100">
            Create Job
          </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default CreateJob;
