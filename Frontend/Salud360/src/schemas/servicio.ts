import { DateTime } from "luxon";
import { z } from "zod";
import { comunidadSchema } from "./comunidad";
import { localSchema } from "./local";
import { citaMedicaSchema } from "./citaMedica";

export const servicioSchema = z.object({
  idServicio: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  imagenes: z.array(z.string()),
  tipo: z.string(),
});

export const extendedServicioSchema = servicioSchema.extend({
  activo: z.boolean(),
  fechaCreacion: z.string().transform((v: string) => DateTime.fromISO(v)),
  fechaDesactivacion: z.string().transform((v: string) => DateTime.fromISO(v)),
  comunidades: comunidadSchema.optional(),
  locales: localSchema.optional(),
  citas: citaMedicaSchema.optional(),
});

export type servicioType = z.infer<typeof servicioSchema>;
