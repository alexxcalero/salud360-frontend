import { IRol } from "./rol";
import { ITipoDocumento } from "./tipoDocumento";

export interface ICliente {
  idCliente?: string;
  correo?: string;
  nombres?: string;
  apellidos?: string;
  numeroDocumento?: string;
  sexo?: string;
  telefono?: string;
  fechaNacimiento?: string;
  direccion?: string;
  fotoPerfil?: string;
  notificacionPorCorreo?: boolean;
  notificacionPorSMS?: boolean;
  notificacionPorWhatsapp?: boolean;
  tipoDocumento?: ITipoDocumento;
  rol?: IRol;
}
