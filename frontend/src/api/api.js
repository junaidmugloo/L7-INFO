import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Change to your FastAPI server
});

export default api;
