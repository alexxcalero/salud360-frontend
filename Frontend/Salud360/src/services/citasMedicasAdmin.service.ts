import { extendedCitaMedicaSchema } from "@/schemas/citaMedica";
import { baseAPI } from "./baseAPI";
import { z } from "zod";

export const getCitaMedicaByIdAPI = async (idCitaMedica: number) => {
  const response = await baseAPI.get(`/citas-medicas/${idCitaMedica}`);
  const parsed = extendedCitaMedicaSchema.parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

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

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};

export const reactivarCitaMedicaAPI = async (idCitaMedica: number) => {
  const response = await baseAPI.post(
    `/citas-medicas/${idCitaMedica}/reactivar`
  );
  const parsed = z.string().parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};

export const getAllCitasMedicasAPI = async () => {
  const response = await baseAPI.get(`/citas-medicas`);

  const parsed = z.array(extendedCitaMedicaSchema).parse(response.data);
  //console.log(parsed);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};

//Para la descarga de archivos
export async function obtenerURLDescargaArchivo(nombreArchivo: string): Promise<string> {
  const response = await fetch(`/api/archivo/descargar/${nombreArchivo}`);
  if (!response.ok) throw new Error("No se pudo obtener la URL de descarga.");
  const data = await response.json();
  return data.url;
}
