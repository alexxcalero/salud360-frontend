export interface IUsuario {
  nombres?: string;
  apellidos?: string;
  correo?: string;
  telefono?: string;
  fechaNacimiento?: string;
  sexo?: string;
  fotoPerfil?: string;
  numeroDocumento?: string;
  // TipoDocumento: string;
  notiCorreo?: boolean;
  notiSMS?: boolean;
  notiWhatsapp?: boolean;
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  // rol: Object
}
