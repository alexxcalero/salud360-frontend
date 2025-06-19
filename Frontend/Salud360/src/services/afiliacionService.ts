export interface Afiliacion {
  estado: "Activa" | "Suspendida" | "Cancelada";
  membresia: {
    precio: number;
    fechaCreacion: string;
  };
}
