import { z } from "zod";

export const localSchema = z.object({
  idLocal: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  direccion: z.string(),
  tipoServicio: z.string(),
  imagenes: z.array(z.string()).optional().nullable(),
  activo: z.boolean().optional().default(false),
});

export type localType = z.infer<typeof localSchema>;
