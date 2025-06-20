import { baseAPI } from "./baseAPI";

export const login = async (correo: string, contrasenha: string) => {
  const response = await baseAPI.post("/autenticacion/login", {
      correo,
      contrasenha,
  });

  return response.data; // asumo que aquí llega un string de respuesta
};
