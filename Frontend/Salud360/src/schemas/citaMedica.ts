import { DateTime } from "luxon";
import { z } from "zod";
import { medicoSchema } from "./medico";

export const citaMedicaSchema = z.object({
  idCitaMedica: z.number(),
  /** @example 14:30:00 */
  hora: z
    .string()
    .default("")
    .transform((str) => DateTime.fromISO(str)),
  /** Format: date */
  fecha: z
    .string()
    .default("")
    .transform((str) => DateTime.fromISO(str)),
  estado: z
    .enum(["available", "canceled", "suscribed", "soon", "full"])
    .optional(),
  medico: medicoSchema,
  // personas?: components["schemas"]["Persona"][];
  //           reservas?: components["schemas"]["Reserva"][];
  //           local?: components["schemas"]["Local"];
});

export type citaMedicaType = z.infer<typeof citaMedicaSchema>;
