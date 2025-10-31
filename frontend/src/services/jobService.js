import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-1-5w1d.onrender.com/api",
  withCredentials: true,
});

// Public
export const getJobs = () => API.get("/jobs/");
export const getJobById = (id) => API.get(`/${id}`);

//Search
export const searchJobs = (query, location) =>
  API.get("/jobs/search", {
    params: { query, location },
  });
  
// Admin-only
export const createJob = (data) => API.post("/jobs/createjobs", data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
