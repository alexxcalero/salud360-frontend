import { servicioSchema } from "@/schemas/servicio";
import { baseAPI } from "./baseAPI";
import { z } from "zod";

export const getServiciosAPI = async () => {
  const response = await baseAPI.get("/servicios");

  const parsed = z.array(servicioSchema).parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta invàlida de la API");

  return parsed;
};
