import { baseAPI } from "./baseAPI";

export const getAllMediosDePagosByUsuarioAPI = async (idUsuario: number) => {
  const response = await baseAPI.get(`mediosDePago/usuario/${idUsuario}`);
  return response.data as IMedioDePago[];
};
