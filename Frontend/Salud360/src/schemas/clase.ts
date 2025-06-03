import { DateTime } from "luxon";
import { z } from "zod";

export const claseSchema = z.object({
  idClase: z.number().optional(),
  nombre: z.string(),
  /** @example 14:30:00 */
  horaInicio: z
    .string()
    .default("")
    .transform((str) => DateTime.fromISO(str)),
  horaFin: z
    .string()
    .default("")
    .transform((str) => DateTime.fromISO(str)),
  /** Format: date */
  fecha: z
    .string()
    .default("")
    .transform((str) => DateTime.fromISO(str)),
  capacidad: z.number(),
  cantAsistentes: z.number(),
  estado: z
    .enum(["available", "canceled", "suscribed", "soon", "full"])
    .optional(),
  activo: z.boolean(),
  fechaCreacion: z.string().transform((str) => DateTime.fromISO(str)),
  fechaDesactivacion: z.string().transform((str) => DateTime.fromISO(str)),
});

export type claseType = z.infer<typeof claseSchema>;
