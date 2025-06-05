import { DateTime } from "luxon";
import { z } from "zod";
import { tipoDocumentoSchema } from "./tipoDocumento";

export const medicoSchema = z.object({
  idMedico: z.number().optional().nullable(),
  nombres: z.string().optional().nullable(),
  apellidos: z.string().optional().nullable(),
  numeroDocumento: z.string().optional().nullable(),
  correo: z.string().optional().optional().nullable(),
  especialidad: z.string().optional().nullable(),
  descripcion: z.string().optional().nullable(),
  sexo: z.string().optional().nullable(),
  fotoPerfil: z.string().url().optional().nullable(),
  activo: z.boolean().optional().nullable(),
  fechaCreacion: z
    .string()
    .transform((v) => DateTime.fromISO(v))
    .optional()
    .nullable(),
  fechaDesactivacion: z
    .string()
    .transform((v) => DateTime.fromISO(v))
    .optional()
    .nullable()
    .nullable(),
  tipoDocumento: tipoDocumentoSchema.optional().nullable(),
});

export type medicoType = z.infer<typeof medicoSchema>;
