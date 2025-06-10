import { extendedServicioSchema } from "@/schemas/servicio";
import { baseAPI } from "./baseAPI";
import { z } from "zod";

export const getServiciosAPI = async () => {
  const response = await baseAPI.get("/servicios");

  const parsed = z.array(extendedServicioSchema).parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};
