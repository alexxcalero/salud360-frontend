import { ICliente } from "./cliente";
import { ILocal } from "./local";
import { IReserva } from "./reserva";

export interface IClase {
  idClase?: number;
  nombre?: string;
  /** @example 14:30:00 */
  horaInicio?: string;
  horaFin?: string;
  /** Format: date */
  fecha?: string;
  capacidad?: number;
  cantAsistentes?: number;
  estado?: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  local?: ILocal;
  reservas?: IReserva[];
  clientes?: ICliente[];
}
