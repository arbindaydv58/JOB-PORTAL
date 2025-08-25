import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary_range: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await getJobById(id);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          company: res.data.company,
          location: res.data.location,
          salary_range: res.data.salary_range,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob(id, formData);
      navigate("/admin/jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update job");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading job...</p>
      </div>
    );

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
          maxWidth: "600px",
          width: "100%",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center mb-4">Edit Job</h2>

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
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
