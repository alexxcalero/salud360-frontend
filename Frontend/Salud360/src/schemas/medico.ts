import { z } from "zod";

export const medicoSchema = z.object({
  idUsuario: z.number(),
  nombres: z.string(),
  apellidos: z.string(),
  numeroDocumento: z.string(),
  correo: z.string(),
  especialidad: z.string(),
  descripcion: z.string(),
});
