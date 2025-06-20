import { IComunidad } from "./comunidad";

export interface IMembresia {
  idMembresia?: number;
  nombre?: string;
  descripcion?: string;
  tipo?: string;
  conTope?: boolean;
  precio?: number;
  cantUsuarios?: number;
  maxReservas?: number;
  icono?: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  comunidad?: IComunidad;
}
