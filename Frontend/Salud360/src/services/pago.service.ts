import { IPago } from "@/models/pago";
import { baseAPI } from "./baseAPI";

export const postPagoAPI = async (pago: IPago) => {
  const response = await baseAPI.post("pagos", pago);
  return response.data as IPago;
};
