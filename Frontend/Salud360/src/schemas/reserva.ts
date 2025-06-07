import { DateTime } from "luxon";
import { z } from "zod";
import { clienteSchema } from "./cliente";
import { claseResumenDTOSchema } from "./clase";
import { citaMedicaVistaUsuarioSchema } from "./citaMedica";
import { comunidadSchema } from "./comunidad";

export const reservaSchema = z.object({
  idReserva: z.number().optional().nullable(),
  estado: z.string().optional().nullable(),
  fechaReserva: z
    .string()
    .transform((v: string) => DateTime.fromISO(v))
    .optional()
    .nullable(),
  fechaCancelacion: z
    .string()
    .transform((v: string) => DateTime.fromISO(v))
    .optional()
    .nullable(),
  cliente: z
    .lazy(() => clienteSchema.optional().nullable())
    .optional()
    .nullable(),
  clase: z
    .lazy(() => claseResumenDTOSchema.optional().nullable())
    .optional()
    .nullable(),
  citaMedica: z
    .lazy(() => citaMedicaVistaUsuarioSchema.optional().nullable())
    .optional()
    .nullable(),
  comunidad: z
    .lazy(() => comunidadSchema.optional().nullable())
    .optional()
    .nullable(),
});

export type reservaType = z.infer<typeof reservaSchema>;
