import { DateTime } from "luxon";
import { z } from "zod";
import { tipoDocumentoSchema } from "./tipoDocumento";

export const medicoSchema = z.object({
  idMedico: z.number().optional(),
  nombres: z.string().optional(),
  apellidos: z.string().optional(),
  numeroDocumento: z.string().optional(),
  correo: z.string().optional().optional(),
  especialidad: z.string().optional(),
  descripcion: z.string().optional(),
  sexo: z.string().optional(),
  fotoPerfil: z.string().url().optional().nullable(),
  activo: z.boolean().optional(),
  fechaCreacion: z
    .string()
    .transform((v) => DateTime.fromISO(v))
    .optional(),
  fechaDesactivacion: z
    .string()
    .transform((v) => DateTime.fromISO(v))
    .optional()
    .nullable(),
  tipoDocumento: tipoDocumentoSchema.optional(),
});

export type medicoType = z.infer<typeof medicoSchema>;
