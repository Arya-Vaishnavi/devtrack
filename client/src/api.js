import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

export const getTasks = () => API.get("/api/tasks");
export const addTask = (task) => API.post("/api/tasks", task);
export const updateTask = (id, task) => API.put(`/api/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/api/tasks/${id}`);