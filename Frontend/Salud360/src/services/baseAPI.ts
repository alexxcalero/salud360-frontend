import axios from "axios";

// Crea una instancia que evalúa un url base de la api
export const baseAPI = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  withCredentials: true, // Necesario para trabajar en autenticación
});
