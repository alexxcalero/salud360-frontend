import axios from "axios";

export const login = async (correo: string, contrasenha: string) => {
  const response = await axios.post("http://localhost:8080/api/usuarios/login", null, {
    params: {
      correo,
      contrasenha,
    }
  });

  return response.data; // Devuelve la respuesta del servidor
};