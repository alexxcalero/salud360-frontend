import { IPago } from "@/models/pago";
import { baseAPI } from "./baseAPI";
import { IReporte } from "@/models/reporte";

export const postBoletaAPI = async (pago: IPago) => {
  const response = await baseAPI.post("reportes/boleta", pago);
  return response.data as IReporte;
};
