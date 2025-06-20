import { ICitaMedica } from "./citaMedica";
import { IClase } from "./clase";
import { ICliente } from "./cliente";
import { IComunidad } from "./comunidad";

export interface IReserva {
  idReserva?: number;
  estado?: string;
  fechaReserva?: string;
  fechaCancelacion?: string;
  cliente?: ICliente;
  clase?: IClase;
  citaMedica?: ICitaMedica;
  comunidad?: IComunidad;
}
