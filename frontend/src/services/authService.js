import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // adjust as needed
  withCredentials: true,
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const changePassword = (data) => API.post("/change-password", data);
export const logoutUser = () => API.post("/logout");
