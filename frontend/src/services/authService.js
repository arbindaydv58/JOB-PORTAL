import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-1-5w1d.onrender.com/api", // adjust as needed
  withCredentials: true,
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const changePassword = (data) => API.post("/auth/change-password", data);
export const logoutUser = () => API.post("/auth/logout");
