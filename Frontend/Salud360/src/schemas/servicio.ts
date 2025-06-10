import { DateTime } from "luxon";
import { z } from "zod";
import { comunidadSchema } from "./comunidad";
import { localSchema } from "./local";
import { citaMedicaSchema } from "./citaMedica";

export const servicioSchema = z.object({
  idServicio: z.number().optional().nullable(),
  nombre: z.string().optional().nullable(),
  descripcion: z.string().optional().nullable(),
  imagenes: z.array(z.string()).optional().nullable(),
  tipo: z.string().optional().nullable(),
});

export const extendedServicioSchema = servicioSchema.extend({
  activo: z.boolean().optional().nullable(),
  fechaCreacion: z
    .string()
    .transform((v: string) => DateTime.fromISO(v))
    .optional()
    .nullable(),
  fechaDesactivacion: z
    .string()
    .transform((v: string) => DateTime.fromISO(v))
    .optional()
    .nullable(),
  comunidades: z.lazy(() => z.array(comunidadSchema).optional().nullable()),
  locales: z.lazy(() => z.array(localSchema).optional().nullable()),
  citas: z.lazy(() => citaMedicaSchema.optional().nullable()),
});

export type servicioType = z.infer<typeof servicioSchema>;
export type extendedServicioType = z.infer<typeof extendedServicioSchema>;
