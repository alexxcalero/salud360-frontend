import { z } from "zod";

export const rolSchema = z.object({
  idRol: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
});

export type rolType = z.infer<typeof rolSchema>;
