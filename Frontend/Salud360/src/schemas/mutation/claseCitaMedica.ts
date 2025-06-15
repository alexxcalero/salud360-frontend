import { z } from "zod";
import { extendedCitaMedicaSchema } from "../citaMedica";
import { claseDTOSchema } from "../clase";
import { reservaSchema } from "../reserva";

export const comunidadHorarioSchema = z.discriminatedUnion("tipo", [
  extendedCitaMedicaSchema.extend({ tipo: z.literal("citaMedica") }),
  claseDTOSchema.extend({ tipo: z.literal("clase") }),
  reservaSchema.extend({ tipo: z.literal("reserva") }),
]);

export type comunidadHorarioType = z.infer<typeof comunidadHorarioSchema>;
