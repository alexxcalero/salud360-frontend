import { reservaSchema } from "@/schemas/reserva";
import { baseAPI } from "./baseAPI";
import { z } from "zod";

export const postReservarAPI = async (data: any) =>
  baseAPI.post("/reservas", data);

export const getReservaByIdAPI = async (idReserva: number) => {
  const response = await baseAPI.get(`/reservas/${idReserva}`);
  const parsed = reservaSchema.parse(response.data);
  return parsed;
};

export const deleteReservaAPI = async (idReserva: number) =>
  await baseAPI.delete(`/reservas/${idReserva}`);

export const getAllUserReservas = async (idCliente: number) => {
  const response = await baseAPI.get(`/cliente/${idCliente}/reservas`);
  const parsed = z.array(reservaSchema).parse(response.data);
  return parsed;
};

export const getAllCommunityReservasAPI = async (idComunidad: number) => {
  const response = await baseAPI.get(`/comunidades/${idComunidad}/reservas`);
  const parsed = z.array(reservaSchema).parse(response.data);
  return parsed;
};
