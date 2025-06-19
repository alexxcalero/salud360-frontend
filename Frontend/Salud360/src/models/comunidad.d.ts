import { IMembresia } from "./membresia";
import { IServicio } from "./servicio";

export interface IComunidad {
  idComunidad?: number;
  nombre?: string;
  descripcion?: string;
  proposito?: string;
  imagen?: string;
  cantMiembros?: number;
  calificacion?: number;
  servicios?: IServicio[];
  membresias?: IMembresia[];
}
