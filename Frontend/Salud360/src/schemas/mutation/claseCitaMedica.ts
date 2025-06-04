import { z } from "zod";
import { extendedCitaMedicaSchema } from "../citaMedica";
import { claseDTOSchema } from "../clase";

export const comunidadHorarioSchema = z.discriminatedUnion("tipo", [
  extendedCitaMedicaSchema.extend({ tipo: z.literal("citaMedica") }),
  claseDTOSchema.extend({ tipo: z.literal("clase") }),
]);

export type comunidadHorarioType = z.infer<typeof comunidadHorarioSchema>;
