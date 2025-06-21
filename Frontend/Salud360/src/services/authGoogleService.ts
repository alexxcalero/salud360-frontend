// src/services/authService.ts
import { baseAPI } from "./baseAPI";

export const authGoogleService = async (correo: string) => {
  const response = await baseAPI.post("/usuarios/login-google", {
    correo,
  });

  return response.data; // Puedes recibir un token o la info del usuario
};
