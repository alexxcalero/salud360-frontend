import { IComunidad } from "./comunidad";
import { AfiliacionEstado } from "./enums/afiliacion";
import { IMembresia } from "./membresia";
import { IUsuario } from "./usuario";

export interface IAfiliacion {
  membresia?: IMembresia;
  idAfiliacion?: number;
  estado?: AfiliacionEstado;
  fechaAfiliacion?: string;
  fechaDesafiliacion?: string;
  fechaReactivacion?: string;
  medioDePago?: IMedioDePago;
  usuario?: IUsuario;
  comunidad?: IComunidad;
}
