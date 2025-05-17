// src/services/authService.ts
import axios from "axios";

export const authGoogleService = async (correo: string) => {
  const response = await axios.post("http://localhost:8080/api/usuarios/login-google", {
    correo,
  });

  return response.data; // Puedes recibir un token o la info del usuario
};
