import { baseAPI } from "./baseAPI";

export const login = async (correo: string, contrasenha: string) => {
  const response = await axios.post("http://localhost:8080/api/usuarios/login", {
      correo,
      contrasenha,
  });

  return response.data; // asumo que aquí llega un string de respuesta
};
