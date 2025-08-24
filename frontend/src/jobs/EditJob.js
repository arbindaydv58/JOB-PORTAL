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

  if (loading) return <p>Loading job...</p>;

  return (
    <div>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} />
        <textarea name="description" value={formData.description} onChange={handleChange} />
        <input name="company" value={formData.company} onChange={handleChange} />
        <input name="location" value={formData.location} onChange={handleChange} />
        <input name="salary_range" value={formData.salary_range} onChange={handleChange} />
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;
