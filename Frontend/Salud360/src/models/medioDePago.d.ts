import { IUsuario } from "./usuario";

export interface IMedioDePago {
  idMedioDePago?: number;
  tipo?: string;
  ncuenta?: number;
  vencimiento?: string;
  cvv?: number;
  activo?: boolean;
  fechaCreacion?: string;
  fechaDesactivacion?: string;
  usuario?: IUsuario;
  totalGastado?: number;
}
