import { IComunidad } from "@/models/comunidad";
import { baseAPI } from "./baseAPI";

export const getComunidadByIdAPI = async (idComunidad: number) => {
  const response = await baseAPI.get(`comunidades/${idComunidad}`);
  return response.data as IComunidad;
};
