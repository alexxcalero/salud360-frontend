import { DateTime } from "luxon";
import { z } from "zod";

export const membresiaSchema = z.object({
  idMembresia: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  tipo: z.string(),
  conTope: z.boolean(),
  precio: z.number(),
  cantUsuariosinteger: z.number(),
  maxReservasinteger: z.number(),
  icono: z.string(),
  activo: z.boolean(),
  fechaCreacion: z.string().transform((v: string) => DateTime.fromISO(v)),
  fechaDesactivacion: z.string().transform((v: string) => DateTime.fromISO(v)),
});

export type membresiaType = z.infer<typeof membresiaSchema>;
