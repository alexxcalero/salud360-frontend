import { baseAPI } from "./baseAPI";

export const login = async (correo: string, contraseña: string) => {
  const response = await baseAPI.post("/usuarios/login", {
    correo,
    contraseña,
  });

  return response.data; // asumo que aquí llega un string de respuesta
};
