export interface IPago {
  idPago?: number;
  monto?: number;
  fechaPago?: string;
  idAfiliacion?: number;
  medioDePago: IMedioDePago;
}
