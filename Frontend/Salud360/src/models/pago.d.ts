import { IAfiliacion } from "./afiliacion";

export interface IPago {
  idPago?: number;
  monto?: number;
  fechaPago?: string;
  afiliacion?: IAfiliacion;
  medioDePago: IMedioDePago;
}
