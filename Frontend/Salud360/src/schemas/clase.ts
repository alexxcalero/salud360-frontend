import { DateTime } from "luxon";
import { z } from "zod";
import { localSchema } from "./local";
import { reservaSchema } from "./reserva";
import { clienteSchema } from "./cliente";

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

export const claseDTOSchema = z.object({
  idClase: z.number().optional().nullable(),
  nombre: z.string().nullable(),
  descripcion: z.string().optional().nullable(),
  /** Format: date */
  fecha: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  /** @example 14:30:00 */
  horaInicio: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  horaFin: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  capacidad: z.number().optional().nullable(),
  cantAsistentes: z.number().optional().nullable(),
  estado: z
    .string() // Recordatorio: Debo ver de nuevo el audio de Alex para entender esto
    .optional()
    .nullable(),
  activo: z.boolean().optional().nullable(),
  fechaCreacion: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  fechaDesactivacion: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  local: z.lazy(() => localSchema.optional().nullable()),
  reservas: z.lazy(() => z.array(reservaSchema).optional().nullable()),
  clientes: z.lazy(() => z.array(clienteSchema).optional().nullable()),
});

export const claseResumenDTOSchema = z.object({
  idClase: z.number().optional().nullable(),
  nombre: z.string().nullable(),
  /** Format: date */
  fecha: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  /** @example 14:30:00 */
  horaInicio: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  horaFin: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),
  capacidad: z.number().optional().nullable(),
});

export type claseDTOType = z.infer<typeof claseDTOSchema>;
export type claseResumenDTOType = z.infer<typeof claseResumenDTOSchema>;
