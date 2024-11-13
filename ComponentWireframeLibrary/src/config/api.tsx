import axios from "axios";

export const api = axios.create({
  // Dev URL
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
