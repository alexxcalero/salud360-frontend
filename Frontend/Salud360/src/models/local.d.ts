import { IServicio } from "./servicio";

export interface ILocal {
  idLocal?: number;
  nombre?: string;
  descripcion?: string;
  direccion?: string;
  tipoServicio?: string;
  imagenes?: string[];
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  servicio?: IServicio;
  idServicio?: number;
}
