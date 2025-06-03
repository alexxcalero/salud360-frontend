import { DateTime } from "luxon";
import { z } from "zod";
import { medicoSchema } from "./medico";
import { clienteSchema } from "./cliente";
import { servicioSchema } from "./servicio";

export const citaMedicaSchema = z.object({
  idCitaMedica: z.number(),
  /** @example 14:30:00 */
  horaInicio: z.string().transform((str) => DateTime.fromISO(str)),
  horaFin: z.string().transform((str) => DateTime.fromISO(str)),
  /** Format: date */
  fecha: z.string().transform((str) => DateTime.fromISO(str)),
  estado: z
    .enum(["available", "canceled", "suscribed", "soon", "full"])
    .optional(),
  activo: z.boolean().optional().default(false),
  fechaCreacion: z.string().transform((str) => DateTime.fromISO(str)),
  fechaDesactivacion: z.string().transform((str) => DateTime.fromISO(str)),
});

export const extendedCitaMedicaSchema = citaMedicaSchema.extend({
  medico: medicoSchema,
  cliente: clienteSchema,
  servicio: servicioSchema,
});

export type citaMedicaType = z.infer<typeof citaMedicaSchema>;
export type extenedCitaMedicaType = z.infer<typeof extendedCitaMedicaSchema>;
