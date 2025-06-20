import { boolean } from "zod";
import { IComunidad } from "./comunidad";
import { ILocal } from "./local";
import { ICitaMedica } from "./citaMedica";

export interface IServicio {
  idServicio?: number;
  nombre?: string;
  descripcion?: string;
  imagen?: string;
  tipo?: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  comunidades?: IComunidad[];
  locales?: ILocal[];
  citas?: ICitaMedica[];
}
