import { Config } from "@/lib/config";
import axios from "axios";

// Crea una instancia que evalúa un url base de la api
export const baseAPI = axios.create({
  baseURL: `${Config.BACKEND_HOST}/api`,
  timeout: 10000,
  withCredentials: false, // Necesario para trabajar en autenticación
});
