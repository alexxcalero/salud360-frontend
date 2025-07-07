import { IMedioDePago } from "@/models/medioDePago";
import { baseAPI } from "./baseAPI";

export const getAllMediosDePagosByUsuarioAPI = async (idUsuario: number) => {
  const response = await baseAPI.get(`mediosDePago/usuario/${idUsuario}`);
  return response.data as IMedioDePago[];
};

export const putMedioDePagoAPI = async (medioDePago: IMedioDePago) => {
  const response = await baseAPI.put(
    `mediosDePago/${medioDePago.idMedioDePago}`,
    medioDePago
  );
  return response.data as IMedioDePago[];
};

export const postMedioDePagoAPI = async (medioDePago: IMedioDePago) => {
  console.log(medioDePago);
  const response = await baseAPI.post("mediosDePago", medioDePago);
  return response.data as IMedioDePago;
};

export const getMedioDePagoByIdAPI = async (idMedioDePago: number) => {
  const response = await baseAPI.get(`mediosDePago/${idMedioDePago}`);
  return response.data as IMedioDePago;
};

export const verificarMedioDePagoAPI = async (medioDePago: IMedioDePago) => {
  const response = await baseAPI.post("mediosDePago/verificar", medioDePago);
  return response.data as boolean;
};
