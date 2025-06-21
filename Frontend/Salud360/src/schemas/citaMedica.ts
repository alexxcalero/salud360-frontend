import { DateTime } from "luxon";
import { z } from "zod";
import { medicoSchema } from "./medico";
import { clienteSchema } from "./cliente";
import { servicioSchema } from "./servicio";

export const citaMedicaSchema = z.object({
  idCitaMedica: z.number().optional(),
  /** @example 14:30:00 */
  horaInicio: z
    .string()
    .transform((str) => DateTime.fromFormat(str, "HH:mm:ss"))
    .optional(),
  horaFin: z
    .string()
    .transform((str) => DateTime.fromFormat(str, "HH:mm:ss"))
    .optional(),
  /** Format: date */
  fecha: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional(),
  estado: z.string().optional(),
  activo: z.boolean().optional(),
  fechaCreacion: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional(),
  fechaDesactivacion: z
    .string()
    .transform((str) => DateTime.fromISO(str))
    .optional()
    .nullable(),

    //agregado rb
    medico: z.lazy(() => medicoSchema.optional().nullable()),
});

export const extendedCitaMedicaSchema = citaMedicaSchema.extend({
  medico: z.lazy(() => medicoSchema.optional().nullable()),
  cliente: z.lazy(() => clienteSchema.optional().nullable()),
  servicio: z.lazy(() => servicioSchema.optional().nullable()),
  descripcion: z.string().optional().nullable(),
  nombreArchivo: z.string().optional().nullable(),
  
});

export const citaMedicaVistaUsuarioSchema = citaMedicaSchema.extend({
  medico: z.lazy(() => medicoSchema.optional()),
});

export type citaMedicaType = z.infer<typeof citaMedicaSchema>;
export type extenedCitaMedicaType = z.infer<typeof extendedCitaMedicaSchema>;
export type citaMedicaVistaUsuarioType = z.infer<
  typeof citaMedicaVistaUsuarioSchema
>;
