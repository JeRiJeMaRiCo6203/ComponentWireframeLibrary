import axios from "axios";

export const api = axios.create({
  // Dev URL
  baseURL: "http://localhost:4321",
  headers: {
    "Content-Type": "application/json",
  },
});
