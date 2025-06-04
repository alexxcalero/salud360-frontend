import { DateTime } from "luxon";
import { z } from "zod";
import { tipoDocumentoSchema } from "./tipoDocumento";
import { rolSchema } from "./rol";

export const clienteSchema = z.object({
  idCliente: z.number(),
  correo: z.string(),
  nombres: z.string(),
  apellidos: z.string(),
  numeroDocumento: z.string(),
  sexo: z.string(),
  telefono: z.string(),
  fechaNacimiento: z.string().transform((val: string) => DateTime.fromISO(val)),
  direccion: z.string(),
  fotoPerfil: z.string().url(),
  notificacionPorCorreo: z.boolean(),
  notificacionPorSMS: z.boolean(),
  notificacionPorWhatsapp: z.boolean(),
  tipoDocumento: tipoDocumentoSchema.optional(),
  rol: rolSchema.optional(),
});
