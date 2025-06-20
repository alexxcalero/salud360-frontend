import { ITipoDocumento } from "./tipoDocumento";

export interface IMedico {
  idMedico?: number;
  nombres?: string;
  apellidos?: string;
  numeroDocumento?: string;
  correo?: string;
  especialidad?: string;
  descripcion?: string;
  sexo?: string;
  fotoPerfil?: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  tipoDocumento?: ITipoDocumento;
}
