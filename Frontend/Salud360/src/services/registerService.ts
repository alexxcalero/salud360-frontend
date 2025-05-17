import axios from "axios"

export const register = async (datosRegistro: {
  nombres: string
  apellidos: string
  tipoDocumento: string
  numeroDocumento: string
  fechaNacimiento: string
  lugarResidencia: string
  correo: string
  contraseña: string
  telefono: string
}) => {
  const response = await axios.post("http://localhost:8080/api/usuarios/registro", datosRegistro)
  return response.data
}
