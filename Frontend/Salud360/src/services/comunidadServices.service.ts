import { z } from "zod";
import { baseAPI } from "./baseAPI";
import { comunidadHorarioSchema } from "@/schemas/mutation/claseCitaMedica";

export const getAllCitasMedicasByComunityAPI = async (idComunidad: number) => {
  const response = await baseAPI.get(
    `/comunidades/${idComunidad}/citas-medicas`
  );

  const parsed = z
    .array(comunidadHorarioSchema)
    // @ts-ignore
    .safeParse(response.data.map((c) => ({ ...c, tipo: "citaMedica" })));

  if (!parsed.success) {
   // console.log("Errores:");
   // console.log(parsed.error.format());
  }

  return parsed.data?.filter((c) => c !== undefined);
};

export const getAllClasesByComunityAPI = async (idComunidad: number) => {
  const response = await baseAPI.get(`/comunidades/${idComunidad}/clases`);

  const parsed = z
    .array(comunidadHorarioSchema)
    // @ts-ignore
    .safeParse(response.data.map((c) => ({ ...c, tipo: "clase" })));

  if (!parsed.success) {
   // console.log("Errores:");
  //  console.log(parsed.error.format());
  }

  return parsed.data?.filter((c) => c !== undefined);
};

export const getAllUserReservasByComunity = async (idCliente: number, idComunidad: number) => {
  const response = await baseAPI.get(`/cliente/${idCliente}/reservas/${idComunidad}`);
  const parsed = z
    .array(comunidadHorarioSchema)
    // @ts-ignore
    .parse(response.data.map((c) => ({ ...c, tipo: "reserva" })));
  return parsed;
};
