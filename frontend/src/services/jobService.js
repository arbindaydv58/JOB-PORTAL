import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-backend-96vc.onrender.com/api/jobs",
  withCredentials: true,
});

// Public
export const getJobs = () => API.get("/");
export const getJobById = (id) => API.get(`/${id}`);

//Search
export const searchJobs = (query, location) =>
  API.get("/search", {
    params: { query, location },
  });
  
// Admin-only
export const createJob = (data) => API.post("/createjobs", data);
export const updateJob = (id, data) => API.put(`/${id}`, data);
export const deleteJob = (id) => API.delete(`/${id}`);
