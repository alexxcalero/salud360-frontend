import { baseAPI } from "./baseAPI";
import { z } from "zod";
import { claseDTOSchema } from "@/schemas/clase";

export const getClaseByIdAPI = async (idClase: number) => {
  const response = await baseAPI.get(`/clases/${idClase}`);
  const parsed = claseDTOSchema.parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};

export const postClaseAPI = async (clase: any) => {
  const response = await baseAPI.post("/clases", clase);
  return response;
};

export const putClaseAPI = async (clase: any) => {
  const response = await baseAPI.put(`/clases/${clase.idClase}`, clase);
  return response;
};

export const deleteClaseAPI = async (idClase: number) => {
  const response = await baseAPI.delete(`/clases/${idClase}`);
  const parsed = z.string().parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};

export const reactivarClaseAPI = async (idClase: number) => {
  const response = await baseAPI.post(`/clases/${idClase}/reactivar`);
  const parsed = z.string().parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};

export const getAllClasesAPI = async () => {
  const response = await baseAPI.get(`/clases`);
  const parsed = z.array(claseDTOSchema).safeParse(response.data);

  if (!parsed.success) {
    //console.log("Errores:");
    //console.log(parsed.error.format());
  }

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed.data;
};
