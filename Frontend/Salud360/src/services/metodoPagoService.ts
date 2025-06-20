export interface MetodoPago {
  idMedioDePago: number;
  tipo: "mastercard" | "visa";
  ncuenta: string;
}
