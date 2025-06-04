import { extendedCitaMedicaSchema } from "@/schemas/citaMedica";
import { baseAPI } from "./baseAPI";
import { z } from "zod";

export const getCitaMedicaByIdAPI = async (idCitaMedica: number) => {
  const response = await baseAPI.get(`/citas-medicas/${idCitaMedica}`);
  const parsed = extendedCitaMedicaSchema.parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta invàlida de la API");

  return parsed;
};

export const postCitaMedicaAPI = async (citaMedica: any) => {
  const response = await baseAPI.post("/citas-medicas", citaMedica);
  return response;
};

export const putCitaMedicaAPI = async (citaMedica: any) => {
  const response = await baseAPI.put(
    `/citas-medicas/${citaMedica.idCitaMedica}`,
    citaMedica
  );
  return response;
};

export const deleteCitaMedicaAPI = async (idCitaMedica: number) => {
  const response = await baseAPI.delete(`/citas-medicas/${idCitaMedica}`);
  const parsed = z.string().parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta invàlida de la API");

  return parsed;
};

export const reactivarCitaMedicaAPI = async (idCitaMedica: number) => {
  const response = await baseAPI.post(
    `/citas-medicas/${idCitaMedica}/reactivar`
  );
  const parsed = z.string().parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta invàlida de la API");

  return parsed;
};

export const getAllCitasMedicasAPI = async () => {
  const response = await baseAPI.get(`/citas-medicas`);
  console.log(response.data);
  const parsed = z.array(extendedCitaMedicaSchema).safeParse(response.data);

  if (!parsed.success) {
    console.log("Errores:");
    console.log(parsed.error.format());
  }

  if (response.status !== 200) throw new Error("Respuesta invàlida de la API");

  return parsed.data;
};
