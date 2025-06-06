import { z } from "zod";
import { extendedServicioSchema } from "./servicio";

export const comunidadSchema = z.object({
  idComunidad: z.number().optional().nullable(),
  nombre: z.string().optional().nullable(),
  descripcion: z.string().optional().nullable(),
  proposito: z.string().optional().nullable(),
  imagenes: z.array(z.string()).optional().nullable(),
  cantMiembros: z.number().optional().nullable(),
  calificacion: z.number().optional().nullable(),
});

export const extendedComunidadSchema = comunidadSchema.extend({
  servicios: z.lazy(() =>
    z.array(extendedServicioSchema).optional().nullable()
  ),
  membresias: z.lazy(() =>
    z.array(extendedServicioSchema).optional().nullable()
  ),
});
export type tipoDocumentoType = z.infer<typeof comunidadSchema>;
