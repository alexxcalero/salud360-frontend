import { ICliente } from "./cliente";
import { IMedico } from "./medico";
import { IServicio } from "./servicio";

export interface ICitaMedica {
  idCitaMedica?: number;
  /** @example 14:30:00 */
  horaInicio?: string;
  horaFin?: string;
  /** Format: date */
  fecha?: string;
  estado?: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  medico?: IMedico;
  cliente?: ICliente;
  servicio?: IServicio;
  documentosMedicos?: any[];
}
