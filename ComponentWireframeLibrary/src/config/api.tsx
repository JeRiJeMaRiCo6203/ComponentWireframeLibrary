import axios from "axios";

export const api = axios.create({
  // Dev URL
  baseURL: "http://localhost:4321/api",
  headers: {
    "Content-Type": "application/json",
  },
});
