import { reservaSchema } from "@/schemas/reserva";
import { baseAPI } from "./baseAPI";
import { z } from "zod";

export const getAllClienteReservasAPI = async (idCliente: number) => {
  const response = await baseAPI.get(`/cliente/${idCliente}/reservas`);
  const parsed = z.array(reservaSchema).safeParse(response.data);

  if (!parsed.success) {
   // console.log("Errores:");
   // console.log(parsed.error.format());
  }

  return parsed.data;
};
