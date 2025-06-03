import { DateTime } from "luxon";
import { z } from "zod";
import { clienteSchema } from "./cliente";
import { claseSchema } from "./clase";
import { citaMedicaSchema } from "./citaMedica";

export const reservaSchema = z.object({
  idReserva: z.number(),
  estado: z.string(),
  fechaReserva: z.string().transform((v: string) => DateTime.fromISO(v)),
  fechaCancelacion: z.string().transform((v: string) => DateTime.fromISO(v)),
  cliente: clienteSchema,
  clase: claseSchema.optional(),
  citaMedica: citaMedicaSchema.optional(),
});

export type reservaType = z.infer<typeof reservaSchema>;
