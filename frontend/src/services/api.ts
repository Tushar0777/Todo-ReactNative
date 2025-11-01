import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.101.12:3000/", // replace with your backend IP
});

export const getTasks = () => API.get("/tasks");
export const addTask = (task: any) => API.post("/tasks", task);
export const deleteTask = (id: number) => API.delete(`/tasks/${id}`);
export const toggleTask = (id: number, completed: boolean) => API.put(`/tasks/${id}`, { completed });
