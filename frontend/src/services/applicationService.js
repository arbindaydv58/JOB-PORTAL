import axios from "axios";

const API_URL = "http://localhost:5000/api/applications";

// Axios instance with auth token
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Automatically attach token if available
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Create a new application
export const createApplication = async (data) => {
  try {
    const res = await authAxios.post("/createApplication", data);
    return res.data; // backend response
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to apply");
  }
};

// Get all applications for the logged-in user
export const getApplications = async () => {
  try {
    const res = await authAxios.get("/getApplication");
    return res.data; // array of applications
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch applications");
  }
};

// Update an application's status (e.g., for admin)
export const updateApplication = async (appId, status) => {
  try {
    const res = await authAxios.patch(`/${appId}`, { status });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update application");
  }
};

// Withdraw an application
export const withdrawApplication = async (appId) => {
  try {
    const res = await authAxios.delete(`/${appId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to withdraw application");
  }
};
