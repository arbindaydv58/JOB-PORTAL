import axios from "axios";

const API_URL = "http://localhost:5000/api/application";

// Axios instance with auth token
const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Create a new application
export const createApplication = async (formData) => {
  try {
    const res = await authAxios.post("/createApplication", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Axios data check", res);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to apply");
  }
};

// Get applications (for user or admin)
export const getApplications = async () => {
  try {
    const res = await authAxios.get("/getApplication");
    console.log("hello there", res);

    return res.data; // array of applications
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch applications"
    );
  }
};

// Update application status (admin)
export const updateApplication = async (appId, status) => {
  try {
    const res = await authAxios.patch(`/${appId}`, { status });
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to update application"
    );
  }
};

// Withdraw an application (jobseeker)
export const withdrawApplication = async (appId) => {
  try {
    const res = await authAxios.delete(`/${appId}`);
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to withdraw application"
    );
  }
};
