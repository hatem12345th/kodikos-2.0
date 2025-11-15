// lib/api.ts
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8989/"

export const api = axios.create({
  baseURL: apiUrl as string,
  headers: { "Content-Type": "application/json" },
});
