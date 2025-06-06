import axios from "axios"

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
  const response = await axios.post("http://localhost:8080/api/autenticacion/signup", datosRegistro)
  return response.data
}
