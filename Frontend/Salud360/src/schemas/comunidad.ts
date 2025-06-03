import { z } from "zod";
import { extendedServicioSchema } from "./servicio";

export const comunidadSchema = z.object({
  idComunidad: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  proposito: z.string(),
  imagenes: z.array(z.string()),
  cantMiembros: z.number(),
  calificacion: z.number(),
});

export const extendedComunidadSchema = comunidadSchema.extend({
  servicios: z.array(extendedServicioSchema),
});
export type tipoDocumentoType = z.infer<typeof comunidadSchema>;
