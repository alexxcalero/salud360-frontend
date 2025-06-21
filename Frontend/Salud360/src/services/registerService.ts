import { baseAPI } from "./baseAPI";

export const register = async (datosRegistro: {
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  correo: string;
  contrasenha: string;
  sexo: string; // este campo representa el género
  telefono: string;
  fechaNacimiento: string;
  direccion: string;
  tipoDocumento: {
    idTipoDocumento: string;
  };
}) => {
  const response = await baseAPI.post("/autenticacion/signup", datosRegistro)
  return response.data
}
