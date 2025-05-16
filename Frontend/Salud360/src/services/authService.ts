import axios from "axios";

export const login = async (correo: string, contraseña: string) => {
  const response = await axios.post("http://localhost:8080/api/usuarios/login", {
    correo,
    contraseña,
  });

  return response.data; // asumo que aquí llega un string de respuesta
};