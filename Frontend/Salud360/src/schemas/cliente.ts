import { DateTime } from "luxon";
import { z } from "zod";
import { tipoDocumentoSchema } from "./tipoDocumento";
import { rolSchema } from "./rol";

export const clienteSchema = z.object({
  idCliente: z.number().optional().nullable(),
  correo: z.string().optional().nullable(),
  nombres: z.string().optional().nullable(),
  apellidos: z.string().optional().nullable(),
  numeroDocumento: z.string().optional().nullable(),
  sexo: z.string().optional().nullable(),
  telefono: z.string().optional().nullable(),
  fechaNacimiento: z
    .string()
    .transform((val: string) => DateTime.fromISO(val))
    .optional()
    .nullable(),
  direccion: z.string().optional().nullable(),
  fotoPerfil: z.string().url().optional().nullable(),
  notificacionPorCorreo: z.boolean().optional().nullable(),
  notificacionPorSMS: z.boolean().optional().nullable(),
  notificacionPorWhatsapp: z.boolean().optional().nullable(),
  tipoDocumento: tipoDocumentoSchema.optional().nullable(),
  rol: rolSchema.optional().nullable(),
});
