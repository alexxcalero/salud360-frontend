export interface IReporte {
  idReporte?: number;
  fechaCreacion?: string;
  idAfiliaciones?: number[];
  idPagos?: number[];
  pdf?: string; // From bytes
}
